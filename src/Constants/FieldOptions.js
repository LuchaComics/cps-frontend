export const FINDING_OPTIONS = [
    { value: "pr", label: 'Poor' },
    { value: "fr", label: 'Fair' },
    { value: "gd", label: 'Good' },
    { value: "vg", label: 'Very good' },
    { value: "fn", label: 'Fine' },
    { value: "vf", label: 'Very Fine' },
    { value: "nm", label: 'Near Mint' },
];

export const FINDING_WITH_EMPTY_OPTIONS = [
    { value: "", label: "Please select" }, // EMPTY OPTION
    { value: "pr", label: 'Poor' },
    { value: "fr", label: 'Fair' },
    { value: "gd", label: 'Good' },
    { value: "vg", label: 'Very good' },
    { value: "fn", label: 'Fine' },
    { value: "vf", label: 'Very Fine' },
    { value: "nm", label: 'Near Mint' },
];

export const SUBMISSION_STATES = {
    1: "Waiting for receiving",
    2: "Processing",
    3: "In Review",
    4: "Reviewed",
    5: "Sent back"
}
