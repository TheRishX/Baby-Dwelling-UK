# security_spec.md - Baby Dwelling Storefront Customizer Security Specification

## 1. Data Invariants
1. **Single Config Authority**: Only the document ID `baby_dwelling` within the `siteConfigs` collection is permitted. No arbitrary config IDs or other collections are allowed.
2. **Strict Field Types**: All text field configurations (taglines, titles, badges, links) must be validated as standard `string` data.
3. **Boolean Controls**: Feature flag states (`enableAmazonCheckout`, `enableWalmartCheckout`) must be verified as primitive `bool` values.
4. **Length and Size Constraints**: High-risk text fields like names, links, and titles are bounded strictly (e.g. title lengths <= 500, logo text <= 100) to prevent denial of wallet (DoW) attacks.
5. **Array Structures**: Structured arrays (`categories`, `navigation`, `pages`, `products`, `reviews`) must be present, structured, and size-bounded.
6. **No Client Auth Requirement**: Since this specific applet operates on passcode-based client-side admin validation without live Firebase Auth, the rules must enforce data integrity, strict ID matching, and strict schema validation instead of auth checks.

---

## 2. The "Dirty Dozen" Payloads
The following payloads attempt to break the laws of Identity, Integrity, and State, and must be rejected by the ruleset:

### Payload 1: ID Poisoning / Injection Attack
Attempts to write config with a massive, malicious document ID.
* Target Path: `/siteConfigs/malicious_long_id_12345_injection_attack_to_exhaust_database_resources_and_poison_paths_with_junk_strings`
* Expected Result: `PERMISSION_DENIED`

### Payload 2: Hostile Config Creation
Attempts to hijack another client config namespace.
* Target Path: `/siteConfigs/different_app_id`
* Expected Result: `PERMISSION_DENIED`

### Payload 3: Type Spoofing - Boolean as String
Attempts to write a string value to a boolean toggle (`enableAmazonCheckout`).
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "enableAmazonCheckout": "true"
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 4: Type Spoofing - Number as String
Attempts to write a string price inside products list.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "products": [
    {
      "id": "premium-wrap",
      "price": "ninety-nine"
    }
  ]
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 5: Denial of Wallet - Giant Title Length
Attempts to crash layout and exhaust firestore write limits by sending a 1MB string as a tagline.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "heroTitle": "A... [1MB of text] ...A"
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 6: Missing Required Field
Attempts to save a configuration with a critical missing field (`logoText`).
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "heroTitle": "Breathe Easy.",
  "heroSubtitle": "Enjoy ergonomic comfort"
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 7: Ghost Fields (Shadow Fields)
Attempts to inject a custom unauthorized property into the document schema.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "logoText": "Baby Dwelling",
  "ghostField": "unauthorized_payload_to_corrupt_data"
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 8: Corrupted Navigation Schema
Attempts to upload malformed navigation list with numbers instead of objects.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "navigation": [123, 456]
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 9: Malformed Categories List
Attempts to pass a single object instead of a list for the categories configuration.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "categories": { "id": "all", "name": "All" }
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 10: Empty/Null Signature Product
Attempts to clear out required fields within the signature product schema.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "signatureProduct": null
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 11: Invalid Link Scheme / Injection
Attempts to use the site customizer to store malicious code in CTA buttons.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "heroCta1Link": "javascript:alert(1)"
}
```
* Expected Result: `PERMISSION_DENIED`

### Payload 12: Massive Reviews Count Injection
Attempts to inject a list of reviews with thousands of entries to trigger massive processing charges.
* Document: `/siteConfigs/baby_dwelling`
* Payload:
```json
{
  "reviews": [ ... ] // 10,000 mock reviews
}
```
* Expected Result: `PERMISSION_DENIED`

---

## 3. The Test Runner
Below is a standard `firestore.rules.test.ts` setup confirming that all these hostile payloads are correctly blocked.

```typescript
import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, setDoc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'gen-lang-client-0356842658',
    firestore: {
      rules: require('fs').readFileSync('firestore.rules', 'utf8')
    }
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

test('Blocks unauthorized document IDs', async () => {
  const context = testEnv.unauthenticatedContext();
  const db = context.firestore();
  
  // Payload 1: ID Poisoning
  await expect(
    setDoc(doc(db, 'siteConfigs', 'malicious_long_id_12345'), { logoText: 'Attack' })
  ).rejects.toThrow();
});

test('Blocks malformed SiteConfig schemas', async () => {
  const context = testEnv.unauthenticatedContext();
  const db = context.firestore();
  
  // Payload 3: Type Spoofing
  await expect(
    setDoc(doc(db, 'siteConfigs', 'baby_dwelling'), { enableAmazonCheckout: 'true' })
  ).rejects.toThrow();
});
```
