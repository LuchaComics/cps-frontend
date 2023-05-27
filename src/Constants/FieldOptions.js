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

export const OVERALL_NUMBER_GRADE_OPTIONS = [
    { value: 0.5, label: '0.5' },
    { value: 1.0, label: '1.0' },
    { value: 1.5, label: '1.5' },
    { value: 2.0, label: '2.0' },
    { value: 2.5, label: '2.5' },
    { value: 3.0, label: '3.0' },
    { value:3.5, label: '3.5' },
    { value:4.0, label: '4.0' },
    { value:4.5, label: '4.5' },
    { value:5.0, label: '5.0' },
    { value:5.5, label: '5.5' },
    { value:6.0, label: '6.0' },
    { value:6.5, label: '6.5' },
    { value:7.0, label: '7.0' },
    { value:7.5, label: '7.5' },
    { value:8.0, label: '8.0' },
    { value:8.5, label: '8.5' },
    { value:9.0, label: '9.0' },
    { value:9.2, label: '9.2' },
    { value:9.4, label: '9.4' },
    { value:9.6, label: '9.6' },
    { value:9.8, label: '9.8' },
    { value:10.0, label: '10.0' }
];

export const OVERALL_NUMBER_GRADE_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    { value: 0.5, label: '0.5' },
    { value: 1.0, label: '1.0' },
    { value: 1.5, label: '1.5' },
    { value: 2.0, label: '2.0' },
    { value: 2.5, label: '2.5' },
    { value: 3.0, label: '3.0' },
    { value:3.5, label: '3.5' },
    { value:4.0, label: '4.0' },
    { value:4.5, label: '4.5' },
    { value:5.0, label: '5.0' },
    { value:5.5, label: '5.5' },
    { value:6.0, label: '6.0' },
    { value:6.5, label: '6.5' },
    { value:7.0, label: '7.0' },
    { value:7.5, label: '7.5' },
    { value:8.0, label: '8.0' },
    { value:8.5, label: '8.5' },
    { value:9.0, label: '9.0' },
    { value:9.2, label: '9.2' },
    { value:9.4, label: '9.4' },
    { value:9.6, label: '9.6' },
    { value:9.8, label: '9.8' },
    { value:10.0, label: '10.0' }
];

export const PUBLISHER_NAME_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    { value: 2, label: 'DC' },
    { value: 3, label: 'Marvel' },
    { value: 4, label: 'Image' },
    { value: 5, label: 'Studiocomix' },
    { value: 6, label: 'Lucha' },
    { value: 7, label: 'Boom! Studios' },
    { value: 8, label: 'Dark Horse Comics' },
    { value: 9, label: 'IDW' },
    { value: 1, label: 'Other (Please specify)' },
];

export const PUBLISHER_NAME_OPTIONS = [
    { value: 2, label: 'DC' },
    { value: 3, label: 'Marvel' },
    { value: 4, label: 'Image' },
    { value: 5, label: 'Studiocomix' },
    { value: 6, label: 'Lucha' },
    { value: 7, label: 'Boom! Studios' },
    { value: 8, label: 'Dark Horse Comics' },
    { value: 9, label: 'IDW' },
    { value: 1, label: 'Other (Please specify)' },
];

export const CPS_PERCENTAGE_GRADE_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    { value:5, label: '5%' },
    { value:10, label: '10%' },
    { value:15, label: '15%' },
    { value:20, label: '20%' },
    { value:25, label: '25%' },
    { value:30, label: '30%' },
    { value:35, label: '35%' },
    { value:40, label: '40%' },
    { value:45, label: '45%' },
    { value:50, label: '50%' },
    { value:55, label: '55%' },
    { value:60, label: '60%' },
    { value:65, label: '65%' },
    { value:70, label: '70%' },
    { value:75, label: '75%' },
    { value:80, label: '80%' },
    { value:85, label: '85%' },
    { value:90, label: '90%' },
    { value:95, label: '95%' },
    { value:98, label: '98%' },
    { value:100, label: '100%' }
];

export const CPS_PERCENTAGE_GRADE_OPTIONS = [
    { value:5, label: '5%' },
    { value:10, label: '10%' },
    { value:15, label: '15%' },
    { value:20, label: '20%' },
    { value:25, label: '25%' },
    { value:30, label: '30%' },
    { value:35, label: '35%' },
    { value:40, label: '40%' },
    { value:45, label: '45%' },
    { value:50, label: '50%' },
    { value:55, label: '55%' },
    { value:60, label: '60%' },
    { value:65, label: '65%' },
    { value:70, label: '70%' },
    { value:75, label: '75%' },
    { value:80, label: '80%' },
    { value:85, label: '85%' },
    { value:90, label: '90%' },
    { value:95, label: '95%' },
    { value:98, label: '98%' },
    { value:100, label: '100%' }
];

export const HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    { value: 2, label: 'My local comic book shop' },
    { value: 3, label: 'CPS website' },
    { value: 4, label: 'Comic Con booth' },
    { value: 5, label: 'Friend' },
    { value: 6, label: 'Social media' },
    { value: 7, label: 'Blog post article' },
    { value: 1, label: 'Other (Please specify)' },
];

export const HOW_DID_YOU_HEAR_ABOUT_US_OPTIONS = [
    { value: 2, label: 'My local comic book shop' },
    { value: 3, label: 'CPS website' },
    { value: 4, label: 'Comic Con booth' },
    { value: 5, label: 'Friend' },
    { value: 6, label: 'Social media' },
    { value: 7, label: 'Blog post article' },
    { value: 1, label: 'Other (Please specify)' },
];
