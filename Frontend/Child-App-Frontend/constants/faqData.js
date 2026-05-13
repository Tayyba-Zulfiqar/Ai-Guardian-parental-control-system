/**
 * FAQ items displayed in the Help & FAQ modal.
 * Extracted from ProfileTab for maintainability.
 */
export const FAQ_ITEMS = [
    {
        q: "Why does AI Guardian need these permissions?",
        a: "Each permission serves a specific safety purpose — accessibility monitoring detects unsafe content, usage access shows app activity, screen monitoring flags screenshots of harmful content, and notification access catches suspicious alerts.",
    },
    {
        q: "Is my data safe?",
        a: "Yes. All data is encrypted in transit and at rest. It is only shared with your linked parent account and never sold.",
    },
    {
        q: "How do I disable monitoring temporarily?",
        a: "Contact your parent to temporarily pause monitoring from the Parent App. The child app does not allow self-disabling of protections.",
    },
    {
        q: "What happens if I revoke permissions?",
        a: "Protection coverage becomes partial. Your parent will be notified, and the app will prompt you to re-enable the missing permissions.",
    },
    {
        q: "How to contact support?",
        a: "Email us at support@aiguardian.app or use the 'Send Logs' button below to attach diagnostic information to your request.",
    },
];

/**
 * Privacy policy sections displayed in the Privacy & Data modal.
 */
export const PRIVACY_SECTIONS = [
    {
        heading: "What We Collect",
        body: "App usage statistics, screen activity flags, notification metadata, and device identifiers. No personal messages or media files are stored.",
    },
    {
        heading: "Why We Collect It",
        body: "To protect your child from harmful content and report activity summaries to the linked parent account.",
    },
    {
        heading: "Who Sees It",
        body: "Only the linked parent account. Data is never sold to third parties.",
    },
    {
        heading: "How It's Stored",
        body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256) on our secure servers.",
    },
    {
        heading: "Your Rights",
        body: "You may request account deletion at any time. Upon deletion, all associated data is permanently removed within 30 days.",
    },
];
