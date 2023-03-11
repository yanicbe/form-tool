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
// const gecko_class_formItemPairComponent = 'cmp--form-itempair';
const gecko_class_formItemPairLayout = 'lyt--form-itempair';
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
class GeckoForm {
    constructor(formJson, formSelector, submitButtonSelector, backButtonSelector, formStepsSelector) {
        this.formJson = formJson;
        this.formSelector = formSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.backButtonSelector = backButtonSelector;
        this.formStepsSelector = formStepsSelector;
        this.formSteps = [];
        this.currentStep = 1;
        this.geckoRequest = { data: { categories: [] } };
        this.clicksForward = 0;
    }

    validateGeckoForm() {
        // VALIDATION HERE
    }

    buildGeckoForm() {
        this.init();
        this.buildGeckoSteps();
        this.activateCurrentStep(this.formSteps[this.currentStep - 1]);
        this.addListener();
    }

    init() {
        const script = `
        <script>
            function toggleSteps(stepsToEnable, stepsToDisable) {
                // get hidden childs from .lyt--form-steps. loop the unhidden and set the number in wr_p--form-step-number child to index + 1
                if(stepsToDisable[0] !== ""){
                    for (let index = 0; index < stepsToDisable.length; index++) {
                        const stepId = stepsToDisable[index];
                        const step = document.querySelector('[stepHeaderId="' + stepId + '"]')
                        step.classList.add('hidden');
                    }
                }
                if(stepsToEnable[0] !== ""){
                    for (let index = 0; index < stepsToEnable.length; index++) {
                        const stepId = stepsToEnable[index];
                        const step = document.querySelector('[stepHeaderId="' + stepId + '"]')
                        step.classList.toggle('hidden');
                    }
                }
                const header = document.getElementsByClassName('lyt--form-steps')[0]
                const unhidden = []
                for (let index = 0; index < header.children.length; index++) {
                    const child = header.children[index]
                    if(child.nodeName === "DIV") {
                        if (!child.classList.contains("hidden")) {
                            unhidden.push(child)
                        }
                    }
                }
                for (let index = 0; index < unhidden.length; index++) {
                    const el = unhidden[index]
                    el.getElementsByClassName("wr_p--form-step-number")[0].innerText = index + 1 + ""
                }
            }
        </script>
        `;
        $(`${this.formStepsSelector}`).append(script);
        document.getElementsByClassName(this.backButtonSelector.replace('.', ''))[0].setAttribute('submit', 'disabled');
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
        const display = json.display;
        // let content = `<div class="${gecko_class_formItemPairComponent} cmp">`;
        // let content += `<div stepHeaderId="${json.stepId}" class="${gecko_class_formItemPairLayout} ${display ? '' : 'hidden'} lyt">`;
        let content = `<div stepHeaderId="${json.stepId}" class="${gecko_class_formItemPairLayout} ${display ? '' : 'hidden'} lyt">`;

        if(this.formSteps.length > 1) {
            content += `<div class="${gecko_class_formStepDivider} el ${gecko_class_formStepDividerStylingClasses}"></div>`;
        }

        content += `<div class="${gecko_class_formStepComponent} cmp" form-step="${this.formSteps.length > 1 ? 'disabled' : 'active'}">`;
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
        content += '</div>';
        // content += '</div>';

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

    activateCurrentStep(stepId) {
        $(`${this.formSelector} ${gecko_selector_formComponent}`).addClass(gecko_class_hidden);
        $(`${this.formSelector} ${gecko_selector_formComponent}[stepid="${stepId}"]`).removeClass(gecko_class_hidden);
    }

    addListener() {
        $(`${this.submitButtonSelector}`).on('click', this.moveToNextStep.bind(this));
        $(`${this.backButtonSelector}`).on('click', this.moveBack.bind(this));
    }

    moveBack() {
        if(this.clicksForward !== 0) {
            this.clicksForward -= 1;
            const selectedValues = this.getDisplayedItems();
            const prev = selectedValues[this.clicksForward].getAttribute('stepheaderid');
            this.activateCurrentStep(prev);
            selectedValues[this.clicksForward].querySelector('[form-step="done"]').setAttribute('form-step', 'active');
            selectedValues[this.clicksForward + 1].querySelector('[form-step="active"]').setAttribute('form-step', 'disabled');
        }
    }

    // TODO refactor method
    moveToNextStep() {
        $(`${this.formSelector} ${gecko_selector_inputElement}`).removeClass(gecko_class_formItemError);

        const selectedValues = this.getDisplayedItems();
        const prev = selectedValues[this.clicksForward].getAttribute('stepheaderid');
        const currentStep = this.formJson.steps.filter(step => step.stepId == prev)[0];

        const currentStepSelector = `${this.formSelector} ${gecko_selector_formComponent}[stepid="${prev}"]`;

        const exists = this.categoryAlreadyExists(prev);
        if(!(exists < 0)){
            this.removeCategory(exists);
        }

        let categoryRequestObject = {};
        categoryRequestObject.name = prev;
        categoryRequestObject.children = [];

        let error = false;
        
        currentStep.rows.forEach(row => {
            row.elements.forEach(element => {
                const currentSelector = `${currentStepSelector} ${gecko_selector_inputElement}[name="${element.name}"]`;
                // isValid = this.validate: check for type and make different validation methods
                // const value = $(currentSelector).val()?.trim() != '' ? $(currentSelector).val() : null;
                const value = this.validate($(currentSelector)) ? $(currentSelector).val() : null;
                if(value != null) categoryRequestObject.children.push({ name: element.name, value: value });

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
        
        if(this.clicksForward >= selectedValues.length - 1) {
            if(selectedValues.length !== this.geckoRequest.data.categories.length) {
                this.cleanData(selectedValues);
            }
            const settings = this.getSettings();
            $.ajax(settings);
        } else {
            this.clicksForward += 1;
            selectedValues[this.clicksForward].querySelector('[form-step="disabled"]').setAttribute('form-step', 'active');
            this.activateCurrentStep(selectedValues[this.clicksForward].getAttribute('stepheaderid'));
            document.getElementsByClassName(this.backButtonSelector.replace('.', ''))[0].setAttribute('submit', 'enabled');
            selectedValues[this.clicksForward].querySelector('[form-step="active"]').setAttribute('form-step', 'done');
        }
    }

    validate(el) {
        const inputType = el.attr('type');
        if(inputType === 'email') {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(el.val().trim());
        } 
        if(inputType === 'tel') {
            return /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/.test(el.val().trim());
        } 
        if(inputType === 'radio' || inputType === 'checkbox') {
            return true; 
        }
        return el.val()?.trim() != '';
    }

    secondLast(selectedValues) {
        return this.clicksForward + 1 === selectedValues.length;
    }

    getSettings() {
        const removeForm = () => {
            document.getElementsByClassName('cmp--btn-group')[0].classList.add('hidden');
            document.getElementById('test-gecko-form').classList.add('hidden');
            document.getElementsByClassName('cmp--form-steps')[0].classList.add('hidden');
        };
        return {
            'url': `https://zwtzomturrtjckqzgrsu.functions.supabase.co/mail-service?name=${this.formJson.requestName}`,
            'method': 'POST',
            'timeout': 0,
            'headers': {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dHpvbXR1cnJ0amNrcXpncnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0NjE4NDAsImV4cCI6MTk5NDAzNzg0MH0.K2Y_CMi3M6ZkHoebXGLfLffRncrilb57CI9Wx9_oL4o'
            },
            'data': `${JSON.stringify(this.geckoRequest)}`,
            success: function() {
                removeForm();
                document.getElementsByClassName('cd--msg-success')[0].parentElement.classList.remove('hidden');
                document.getElementsByClassName('cd--msg-error')[0].parentElement.classList.add('hidden');
            },
            error: function() {
                document.getElementsByClassName('cd--msg-error')[0].parentElement.classList.remove('hidden');
            }
        };
    }

    categoryAlreadyExists(prev) {
        for (let index = 0; index < this.geckoRequest.data.categories.length; index++) {
            const category = this.geckoRequest.data.categories[index];
            if(category.name === prev) {
                return index;
            }
        }
        return -1;
    }

    removeCategory(index) {
        this.geckoRequest.data.categories.splice(index, 1);
    }

    cleanData(selectedValues) {
        const toRemove = [];
        const stepheaderids = this.getStepheaderids(selectedValues);
        for (let index = 0; index < this.geckoRequest.data.categories.length; index++) {
            const category = this.geckoRequest.data.categories[index];
            if(!stepheaderids.includes(category.name)) {
                toRemove.push(index);
            }
        }
        for (let index = 0; index < toRemove.length; index++) {
            const element = toRemove[index];
            this.removeCategory(element - index);
        }

    }

    getStepheaderids(array) {
        const all = [];
        for (let index = 0; index < array.length; index++) {
            all.push(array[index].getAttribute('stepheaderid'));
        }
        return all;
    }

    getDisplayedItems() {
        const header = document.getElementsByClassName('lyt--form-steps')[0];
        const unhidden = [];
        for (let index = 0; index < header.children.length; index++) {
            const child = header.children[index];
            if(child.nodeName === 'DIV') {
                if (!child.classList.contains('hidden')) {
                    unhidden.push(child);
                }
            }
        }
        return unhidden;
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

        const title = json.title ?? '';

        content += `<p class="h--xs txt--c-pri">${title}</p>`;

        content += `<div class="${gecko_class_radioButtonGroupComponent} cmp">`;
            content += `<div class="${gecko_class_radioButtonGroupLayout} lyt">`;

            json.options.forEach(option => {
                let onClick = this.getOnClick(option);
                content += `<div class="${gecko_class_radioButtonComponent} cmp">`;
                    content += `<div class="${gecko_class_radioButtonLayout} lyt">`;
                        content += `<input id="${option.id}" type="radio" name="${json.name}" class="${gecko_class_radioButton}" onClick=${onClick} value="${option.value}">`;
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

        const title = json.title ?? '';

        content += `<p class="h--xs txt--c-pri">${title}</p>`;

        content += `<div class="${gecko_class_checkboxGroupComponent} cmp">`;
            content += `<div class="${gecko_class_checkboxGroupLayout} lyt">`;

            json.options.forEach(option => {
                let onClick = this.getOnClick(option);
                content += `<div class="${gecko_class_checkboxComponent} cmp">`;
                    content += `<div class="${gecko_class_checkboxLayout} lyt">`;
                        content += `<input id="${option.id}" type="checkbox" name="${json.name}" class="${gecko_class_checkbox}" onClick=${onClick} value="${option.value}">`;
                        content += `<label class="${gecko_class_label}" for="${option.id}">${option.label}</label>`;
                    content += '</div>';
                content += '</div>';
            });

            content += '</div>';
        content += '</div>';

        return content;
    }

    getOnClick(json) {
        let onClick = '';
        if(json.action) {
            const action = json.action;
            if(action.includes('toggleSteps')) {
                onClick = action;
            }
        }
        return onClick;
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