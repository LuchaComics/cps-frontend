import React from "react";
import { startCase } from 'lodash';

function FormSelectField({ label, name, placeholder, selectedValue, errorText, validationText, helpText, onChange, options, disabled, isLoading }) {
    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control">
                <span class="select">
                    <select class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-grey-light`}
                             name={name}
                      placeholder={placeholder}
                         onChange={onChange}
                         disabled={disabled}
                         isLoading={isLoading}>
                        {options && options.map(function(option, i){
                            return <option selected={selectedValue === option.value} value={option.value}>{option.label}</option>;
                        })}
                    </select>
                </span>
            </div>
            {helpText &&
                <p class="help">{helpText}</p>
            }
            {errorText &&
                <p class="help is-danger">{errorText}</p>
            }
        </div>
    );
}

export default FormSelectField;
