import React from "react";
import { startCase } from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FormDateField({ label, name, placeholder, value, type="text", errorText, validationText, helpText, onChange, maxWidth, disabled=false }) {
    let classNameText = "input";
    if (errorText) {
        classNameText = "input is-danger";
    }

    // SPECIAL THANKS:
    // https://reactdatepicker.com/

    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control" style={{maxWidth:maxWidth}}>
                <DatePicker className={classNameText}
                         selected={value}
                             name={name}
                      placeholder={placeholder}
                         disabled={disabled}
                     autoComplete="off"
                     onChange={(date) => onChange(date)}>
                         <div style={{ color: "red" }}>{errorText}</div>
                </DatePicker>
            </div>
            {errorText &&
                <p class="help is-danger">{errorText}</p>
            }
            {helpText &&
                <p class="help">{helpText}</p>
            }
        </div>
    );
}

export default FormDateField;
