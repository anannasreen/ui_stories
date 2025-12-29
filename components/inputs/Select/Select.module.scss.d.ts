export type Styles = {
    clearAllButton: string;
    clearAllContainer: string;
    container: string;
    destructive: string;
    disabled: string;
    dropdownContainer: string;
    icon: string;
    iconContainer: string;
    inputContainer: string;
    inputWrapper: string;
    label: string;
    option: string;
    optionContent: string;
    optionIcon: string;
    optionsList: string;
    pill: string;
    placeholder: string;
    readOnly: string;
    scrollButton: string;
    scrollDown: string;
    scrollUp: string;
    search: string;
    searchContainer: string;
    searchInput: string;
    selectContainer: string;
    selected: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
