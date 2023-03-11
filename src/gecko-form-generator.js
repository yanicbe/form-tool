const gecko_selector_formComponent = '.cmp--form';
const gecko_selector_inputElement = '.inp';

const gecko_class_formComponent = 'cmp--form';
const gecko_class_formLayout = 'lyt--form';

const gecko_class_formRowComponent = 'cmp--form-row';
const gecko_class_formRowLayout = 'lyt--form-row';
const gecko_class_formItemComponent = 'cmp--form-item';
const gecko_class_formItemLayout = 'lyt--form-item';
const gecko_class_inputElement = 'inp';
const gecko_class_label = 'p--l';
const gecko_class_hidden = 'gecko-hidden';
const gecko_class_formStepComponent = 'cmp--form-step';
const gecko_class_formStepLayout = 'lyt--form-step';
const gecko_class_formStepNumberComponent = 'cmp--form-step-number';
const gecko_class_formStepNumberCD = 'cd--form-step-number';
const gecko_class_formStepNumberLayout = 'lyt--form-step-number';
const gecko_class_formStepNumberWrapper = 'wr_p--form-step-number';
const gecko_class_formStepNumberLabel = 'h--xxs';
const gecko_class_formStepNumberLabelStylingClasses = 'txt--lh-100';
const gecko_class_formStepLabelWrapper = 'wr_p--form-step';
const gecko_class_formStepLabelWrapperStylingClasses = 'wr_p txt--a-c txt--no-wrap';
const gecko_class_formStepLabel = 'h--xxs';
const gecko_class_formStepLabelStylingClasses = 'txt--lh-100';
const gecko_class_formStepDivider = 'el--form-step';
const gecko_class_formStepDividerStylingClasses = 'bg--pri';
const gecko_class_formItemError = 'has_error';
const gecko_class_radioButtonGroupComponent = 'cmp--rb-group';
const gecko_class_radioButtonGroupLayout = 'lyt--rb-group';
const gecko_class_radioButtonComponent = 'cmp--rb';
const gecko_class_radioButtonLayout = 'lyt--rb';
const gecko_class_radioButton = 'rb';
const gecko_class_checkboxGroupComponent = 'cmp--cb-group';
const gecko_class_checkboxGroupLayout = 'lyt--cb-group';
const gecko_class_checkboxComponent = 'cmp--cb';
const gecko_class_checkboxLayout = 'lyt--cb';
const gecko_class_checkbox = 'cb';

// eslint-disable-next-line no-unused-vars
class GeckoForm2 {
    constructor(formJson, formSelector, submitButtonSelector, formStepsSelector) {
        this.formJson = formJson;
        this.formSelector = formSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.formStepsSelector = formStepsSelector;
        this.formSteps = [];
        this.currentStep = 1;
        this.geckoRequest = { data: { categories: [] } };
    }

    validateGeckoForm() {
        // VALIDATION HERE
    }

    buildGeckoForm() {
        this.buildGeckoSteps();
        this.activateCurrentStep();
        this.addListener();
    }

    buildGeckoSteps() {
        this.formJson.steps.forEach(step => {
            this.buildSingleGeckoStep(step);
        });
    }

    buildSingleGeckoStep(json) {
        this.formSteps.push(json.stepId);

        this.buildSingleGeckoStepView(json);
        this.buildSingleGeckoStepContent(json);
    }

    buildSingleGeckoStepView(json) {
        let content = '';

        if(this.formSteps.length > 1) {
            content += `<div class="${gecko_class_formStepDivider} el ${gecko_class_formStepDividerStylingClasses}"></div>`;
        }

        content += `<div class="${gecko_class_formStepComponent} cmp">`;
            content += `<div class="${gecko_class_formStepLayout} lyt">`;

                content += `<div class="${gecko_class_formStepNumberComponent} cmp">`;
                    content += `<div class="${gecko_class_formStepNumberCD} cd">`;
                        content += `<div class="${gecko_class_formStepNumberLayout} lyt">`;
                            content += `<div class="${gecko_class_formStepNumberWrapper} wr_p">`;
                                content += `<p class="${gecko_class_formStepNumberLabel} ${gecko_class_formStepNumberLabelStylingClasses}">${this.formSteps.length}</p>`;
                            content += '</div>';
                        content += '</div>';
                    content += '</div>';
                content += '</div>';

                content += `<div class="${gecko_class_formStepLabelWrapper} ${gecko_class_formStepLabelWrapperStylingClasses}">`;
                    content += `<p class="${gecko_class_formStepLabel} ${gecko_class_formStepLabelStylingClasses}">${json.label}</p>`;
                content += '</div>';

            content += '</div>';
        content += '</div>';

        $(`${this.formStepsSelector}`).append(content);
    }

    buildSingleGeckoStepContent(json) {
        let content = '';

        content += `<div class="${gecko_class_formComponent} cmp ${gecko_class_hidden}" stepid="${json.stepId}">`;
            content += `<div class="${gecko_class_formLayout} lyt">`;
                content += this.generateRows(json.rows);
            content += '</div>';
        content += '</div>';

        $(`${this.formSelector}`).append(content);
    }

    activateCurrentStep() {
        $(`${this.formSelector} ${gecko_selector_formComponent}`).addClass(gecko_class_hidden);
        $(`${this.formSelector} ${gecko_selector_formComponent}[stepid="${this.formSteps[this.currentStep - 1]}"]`).removeClass(gecko_class_hidden);
    }

    addListener() {
        $(`${this.submitButtonSelector}`).on('click', this.moveToNextStep.bind(this));
    }

    // TODO refactor method
    moveToNextStep() {
        $(`${this.formSelector} ${gecko_selector_inputElement}`).removeClass(gecko_class_formItemError);

        const currentStepId = this.formSteps[this.currentStep - 1];
        const currentStepSelector = `${this.formSelector} ${gecko_selector_formComponent}[stepid="${currentStepId}"]`;
        let categoryRequestObject = {};

        categoryRequestObject.name = currentStepId;
        categoryRequestObject.children = [];

        const currentStep = this.formJson.steps.filter(step => step.stepId == currentStepId)[0];

        let error = false;
        
        currentStep.rows.forEach(row => {
            row.elements.forEach(element => {
                const currentSelector = `${currentStepSelector} ${gecko_selector_inputElement}[name="${element.name}"]`;
                const value = $(currentSelector).val().trim() != '' ? $(currentSelector).val() : null;
                if(value != null) categoryRequestObject.children.push({ name: element.name, val: value });

                if(element.required == true && value == null) {
                    $(currentSelector).addClass(gecko_class_formItemError);
                    error = true;
                }
            });
        });

        if(error) {
            // OTHER ERROR OPTIONS
            return;
        }
        
        this.geckoRequest.data.categories.push(categoryRequestObject);

        if(this.currentStep >= this.formSteps.length) {
            $.ajax({
                url: `https://ltavphiuzenejhnrbxvl.functions.supabase.co/mail-service?name=${this.formJson.requestName}`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(this.geckoRequest),
                success: function(response) {
                    console.log('Response:', response);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        this.currentStep++;
        this.activateCurrentStep();
    }

    /*checkEntries() {
        this.formJson.rows.forEach(row => {
            row.elements.forEach(element => {
                //if(element)
            });
        });
    }*/

    generateRows(json) {
        let content = '';

        json.forEach(row => {
            content += this.generateSingleRow(row);
        });

        return content;
    }

    generateSingleRow(json) {
        let content = '';

        content += `<div class="${gecko_class_formRowComponent} cmp">`;
            content += `<div class="${gecko_class_formRowLayout} lyt">`;

                json.elements.forEach(element => {
                    content += this.generateSingleFormItem(element);
                });

            content += '</div>';
        content += '</div>';

        return content;
    }

    generateSingleFormItem(json) {
        let content = '';

        content += `<div class="${gecko_class_formItemComponent} cmp">`;
            content += `<div class="${gecko_class_formItemLayout} lyt">`;

                switch(json.type) {
                    case 'text': {
                        content += this.generateInputFormItem(json);
                        break;
                    }
                    case 'email': {
                        content += this.generateInputFormItem(json);
                        break;
                    }
                    case 'tel': {
                        content += this.generateInputFormItem(json);
                        break;
                    }
                    case 'textarea': {
                        content += this.generateTextareaFormItem(json);
                        break;
                    }
                    case 'radio': {
                        content += this.generateRadioFormItem(json);
                        break;
                    }
                    case 'checkbox': {
                        content += this.generateCheckboxFormItem(json);
                        break;
                    }
                }

                
            content += '</div>';
        content += '</div>';

        return content;
    }

    generateRadioFormItem(json) {
        let content = '';

        const label = json.label ?? '';

        content += `<p class="${gecko_class_label}">${label}</p>`;

        content += `<div class="${gecko_class_radioButtonGroupComponent} cmp">`;
            content += `<div class="${gecko_class_radioButtonGroupLayout} lyt">`;

            json.options.forEach(option => {
                content += `<div class="${gecko_class_radioButtonComponent} cmp">`;
                    content += `<div class="${gecko_class_radioButtonLayout} lyt">`;
                        content += `<input id="${option.id}" type="radio" name="${json.name}" class="${gecko_class_radioButton}" value="${option.value}">`;
                        content += `<label class="${gecko_class_label}" for="${option.id}">${option.label}</label>`;
                    content += '</div>';
                content += '</div>';
            });

            content += '</div>';
        content += '</div>';

        return content;
    }

    generateCheckboxFormItem(json) {
        let content = '';

        const label = json.label ?? '';

        content += `<p class="${gecko_class_label}">${label}</p>`;

        content += `<div class="${gecko_class_checkboxGroupComponent} cmp">`;
            content += `<div class="${gecko_class_checkboxGroupLayout} lyt">`;

            json.options.forEach(option => {
                content += `<div class="${gecko_class_checkboxComponent} cmp">`;
                    content += `<div class="${gecko_class_checkboxLayout} lyt">`;
                        content += `<input id="${option.id}" type="checkbox" name="${json.name}" class="${gecko_class_checkbox}" value="${option.value}" required="${option.required}">`;
                        content += `<label class="${gecko_class_label}" for="${option.id}">${option.label}</label>`;
                    content += '</div>';
                content += '</div>';
            });

            content += '</div>';
        content += '</div>';

        return content;
    }

    generateInputFormItem(json) {
        const autocomplete = json.autocomplete ? `autocomplete="${json.autocomplete}"` : '';
        const placeholder = json.placeholder ? `placeholder="${json.placeholder}"` : '';
        const required = json.required ? `required="${json.required}"` : '';
        const name = json.name ? `name="${json.name}"` : '';
        const label = json.label ?? '';

        let content = '';
        content += `<p class="${gecko_class_label}">${label}</p>`;
        content += `<input class="${gecko_class_inputElement}" type="${json.type}" ${placeholder} ${required} ${autocomplete} ${name}>`;

        return content;
    }

    generateTextareaFormItem(json) {
        const placeholder = json.placeholder ? `placeholder="${json.placeholder}"` : '';
        const required = json.required ? `required="${json.required}"` : '';
        const name = json.name ? `name="${json.name}"` : '';
        const label = json.label ?? '';

        let content = '';
        content += `<p class="${gecko_class_label}">${label}</p>`;
        content += `<textarea class="${gecko_class_inputElement}" ${placeholder} ${required} ${name}"></textarea>`;

        return content;
    }
}

// CHECK JSON RULES!!!

// Edge casees (form steps change AFTER WE STARTED!!!)

// Add error handling for exceptions????