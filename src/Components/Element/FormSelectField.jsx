import React from "react";
import { startCase } from 'lodash';

function FormSelectField({ label, name, placeholder, selectedValue, errorText, validationText, helpText, onChange, options }) {
    return (
        <div class="field">
            <label class="label is-small has-text-grey-light">{label}</label>
            <div class="control">
                <span class="select">
                    <select class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-grey-light`}
                             name={name}
                      placeholder={placeholder}
                         onChange={onChange}>
                        {options.map(function(option, i){
                            return <option selected={selectedValue === option.value} value={option.value}>{option.label}</option>;
                        })}

                         {/*
                        <option selected={organizationType === 0} value={0}>Select</option>
                        <option selected={organizationType === 1} value={1}>Private</option>
                        <option selected={organizationType === 2} value={2}>Non-Profit</option>
                        <option selected={organizationType === 3} value={3}>Public</option>
                        <option selected={organizationType === 4} value={4}>Government</option>
                        */}
                    </select>
                </span>
            </div>
            {errorText &&
                <p class="help is-danger">{errorText}</p>
            }
        </div>
    );
}

export default FormSelectField;
