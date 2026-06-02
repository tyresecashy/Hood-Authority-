# Firestore Security Specification - Hood Authority Co.

This specification documents the zero-trust Attribute-Based Access Control (ABAC) and relational sync invariants for the Hood Authority Co. Media Operating System.

## 1. Data Invariants and Relational Rules

1. **Admins and Creators**: The account associated with the email `tyresecashy@gmail.com` is the system owner. Super admin controls are checked dynamically against the user's registered role in the `members` collection OR defined globally in rules if email matches.
2. **Profile Isolation**: Members can only write and update their own profile document (`/members/{uid}`). Users cannot modify their status or role to escalate their privileges to "admin" or "artist".
3. **Immutability of Key Fields**: Once a release, artist, or mythology document is created, its core identity metrics and primary identifiers (such as `id`, `createdAt`, `ownerId`) are immutable.
4. **Draft vs Public Release**: Anonymous reads are allowed only for documents with a status of `"released"`. Scheduled or draft documents can only be read or written by Admin users.
5. **Private Asset Vault Locking**: Files stored in `/vault/{assetId}` represent high-res masters, stems, and unreleased demos. They are readable strictly by `isInnerCircle == true` (verified from `/members/{uid}`) or `isAdmin() == true`. Anonymous and standard users get instant `PERMISSION_DENIED` errors.
6. **Community Integrity**: Community discussions and comments can be written/deleted only by their genuine authors (matching `request.auth.uid`), preventing any content spoofing. Standard members cannot increase their own comment likes.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following twelve payloads are designed to penetrate our layout, bypass identity, or cause a "Denial of Wallet" resource exhaustion attack.

### Payload 1: Admin Privilege Escalation (Self-Assigned Admin Role)
* **Target Collection**: `/members/attacker_uid`
* **Vulnerability Attempted**: Registering as a standard fan, but passing `role: "admin"` and `isInnerCircle: true` to get root dashboard and vault access.
```json
{
  "id": "attacker_uid",
  "email": "attacker@gmail.com",
  "displayName": "Vandal",
  "role": "admin",
  "isInnerCircle": true,
  "level": 999,
  "joinedAt": "2026-06-02T09:16:20Z"
}
```

### Payload 2: Ghost Field Poisoning (Shadow Update Attack)
* **Target Collection**: `/releases/release_123`
* **Vulnerability Attempted**: Splicing unapproved properties like `ghost_auth_bypass: true` and updating a release's title.
```json
{
  "id": "release_123",
  "title": "Malicious Release Title",
  "type": "Single",
  "releaseDate": "2026-06-02",
  "coverUrl": "https://images.com/cover.png",
  "artistIds": ["artist_1"],
  "isPremium": false,
  "status": "released",
  "ghost_auth_bypass": true
}
```

### Payload 3: Direct Vault Asset Theft
* **Target Collection**: `/vault/master_stems_777`
* **Vulnerability Attempted**: Low-tier standard fan account attempting to read high-resolution stems and documents.
```json
{
  "id": "master_stems_777",
  "title": "Unreleased Lead Stems",
  "type": "stems",
  "fileUrl": "http://secureserver.com/stems.zip",
  "createdAt": "2026-06-02T09:16:20Z"
}
```

### Payload 4: ID Poisoning Attack (Resource Bloating)
* **Target Collection**: `/comments/A_JUNK_ID_THAT_IS_1.5_KILOBYTES_LONG_TO_EXHAUST_QUOTA...`
* **Vulnerability Attempted**: Passing massive, malformed junk strings containing illegal characters as Document IDs to exhaust indexing resources.

### Payload 5: Spoofed Author Ownership
* **Target Collection**: `/comments/comment_456`
* **Vulnerability Attempted**: Creating a comment but setting `userId: "target_victim_uid"` instead of the attacker's actual UID.
```json
{
  "id": "comment_456",
  "targetId": "release_123",
  "userId": "target_victim_uid",
  "userName": "Victim User",
  "content": "I am being spoofed!",
  "createdAt": "2026-06-02T09:16:20Z"
}
```

### Payload 6: Temporal Integrity Violation (Spoofed Future Timestamp)
* **Target Collection**: `/comments/comment_777`
* **Vulnerability Attempted**: Supplying a client-provided past or future timestamp inside `createdAt` instead of using the mandatory server timestamp string or rule gate (`request.time`).
```json
{
  "id": "comment_777",
  "targetId": "release_123",
  "userId": "attacker_uid",
  "userName": "Attacker",
  "content": "Temporal anomaly",
  "createdAt": "2029-12-31T23:59:59Z"
}
```

### Payload 7: Anonymous Unreleased Content Fetch
* **Target Collection**: `/releases/scheduled_unreleased_single`
* **Vulnerability Attempted**: Unauthenticated user scanning standard listings and attempting to preview tracks or titles of scheduled/draft releases.

### Payload 8: Immutable Variable Tampering
* **Target Collection**: `/releases/release_123`
* **Vulnerability Attempted**: Overwriting `createdAt` or switching `artistIds` to hijack ownership on a previously launched single.

### Payload 9: Denial of Wallet Query Scrape
* **Target Collection**: `/comments`
* **Vulnerability Attempted**: Executing complete collection list searches (`allow list: if isSignedIn();`) to download the overall comment dataset without matching target IDs.

### Payload 10: State Shortcut Transition
* **Target Collection**: `/releases/release_123`
* **Vulnerability Attempted**: Bypassing scheduled release timelines by directly changing status from `"draft"` to `"released"` without administrative verification.

### Payload 11: Community Like Exploit (Self-Voted Like Increment)
* **Target Collection**: `/comments/comment_123`
* **Vulnerability Attempted**: Standard user attempting to modify the `likes` field of an existing comment from 2 to 1000 without hitting individual validation.

### Payload 12: Invalid Theme Preset Injection
* **Target Collection**: `/themes/corrupted_preset`
* **Vulnerability Attempted**: Standard fan attempting to lock down or corrupt UI styles by uploading invalid structures as default colors.

---

## 3. The Test Assertion Registry

```typescript
// firestore.rules.test.ts (Specifying logical test runner schema)
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';

describe("Hood Authority Co. - Security Matrix", () => {
  it("forbids Anonymous reads on Draft or Scheduled releases", async () => {
    // Expect failure
  });

  it("profiles are tightly bound: Attacker cannot write to Victim's profile", async () => {
    // Expect failure
  });

  it("prevents self-assigned admin roles during signup", async () => {
    // Expect failure
  });

  it("blocks PII leaks: non-owner retrieves restricted fan data", async () => {
    // Expect failure
  });
});
```
