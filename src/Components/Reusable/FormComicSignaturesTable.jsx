import React, { useState } from "react";
import { startCase } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import FormInputField from "./FormInputField";
import FormSelectField from "./FormSelectField";


export const SIGNATURE_ROLES_OPTIONS = [
    { value: "Cover Artist", label: 'Cover Artist' },
    { value: "Writer", label: 'Writer' },
    { value: "Artist", label: 'Artist' },
    { value: "Penciller", label: 'Penciller' },
    { value: "Inker", label: 'Inker' },
    { value: "Creator", label: 'Creator' },
    { value: "Model", label: 'Model' },
];

export const SIGNATURE_ROLES_WITH_EMPTY_OPTIONS = [
    { value: "", label: "Please select" }, // EMPTY OPTION
    ...SIGNATURE_ROLES_OPTIONS
];


/*
    DATA-STRUCTURE
    ---------------
    data - needs to be an array of dictionary objects. For example:
        [
            {
                "role": "Creator",
                "name": "Frank Herbert"
            }
        ].

    FUNCTIONS
    ---------------
    onDataChange - needs to look something like this in your JSX:
        onDataChange={(data)=>onDataChange(data)}



    onListInputFieldChange - needs to look something like this:
        const onListInputFieldChange = (e, i) => {
            // For debugging purposes.
            console.log(e, i);

            // Make a copy of the "array of strings" into a mutable array.
            const copyOfArr = [...previewDescription];

            // Update record.
            copyOfArr[i] = e

            // Save to our react state.
            setPreviewDescription(copyOfArr);
        }

    onRemoveListInputFieldChange - this function is used to remove user selected data:
        const onRemoveListInputFieldChange = (i) => {
            // For debugging purposes.
            console.log(i);

            // Make a copy of the "array of strings" into a mutable array.
            const copyOfArr = [...previewDescription];

            // Delete record.
            const x = copyOfArr.splice(i, 1);

            // For debugging purposes.
            console.log(x);

            // Save to our react state.
            setPreviewDescription(copyOfArr);
        }

    onAddListInputFieldClick - this function is used to add data:
        const onAddListInputFieldClick = () => {
            // For debugging purposes.
            console.log("add");

            // Make a copy of the "array of strings" into a mutable array.
            const copyOfArr = [...previewDescription];

            // Add empty record.
            copyOfArr.push("");

            // For debugging purposes.
            console.log(copyOfArr);

            // Save to our react state.
            setPreviewDescription(copyOfArr);
        }


*/
function FormComicSignaturesTable({ data, onDataChange, }) {

    ////
    //// Component states.
    ////

    const [showAddModal, setShowAddModal] = useState(true);
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = () => {
        console.log("Adding...");
        setShowAddModal(!showAddModal);
    }

    ////
    //// Component rendering.
    ////

    // Render the JSX component with the data.
    return (
        <>
            <div class={`modal ${showAddModal && 'is-active'}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Add Signature</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowAddModal(!showAddModal)}></button>
                    </header>
                    <section class="modal-card-body">

                    <FormInputField
                        label="name"
                        name="name"
                        placeholder="Text input"
                        value={name}
                        errorText={errors && errors.name}
                        helpText=""
                        onChange={(e)=>setName(e.target.value)}
                        isRequired={true}
                        maxWidth="380px"
                    />

                    <FormSelectField
                        label="Role"
                        name="role"
                        placeholder="Pick role"
                        selectedValue={role}
                        errorText={errors && errors.role}
                        helpText=""
                        onChange={(e)=>setRole(parseInt(e.target.value))}
                        options={SIGNATURE_ROLES_WITH_EMPTY_OPTIONS}
                        isRequired={true}
                        maxWidth="110px"
                    />

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" onClick={onSubmitClick}>Save changes</button>
                        <button class="button" onClick={(e)=>setShowAddModal(!showAddModal)}>Cancel</button>
                    </footer>
                </div>
            </div>

            <div class="pb-4">
                <label class="label">Comic Signatures &nbsp;
                    {/*<button class="button is-success is-small" onClick={onAddListInputFieldClick} disabled={disabled}><FontAwesomeIcon className="fas" icon={faPlus} /></button>*/}
                </label>
                <p class="control is-expanded">

                    <table class="table">
                        <thead>
                            <tr>
                                <th><abbr title="Signature Role">Role</abbr></th>
                                <th>Signed By</th>
                                <th>
                                    <button class="button is-success is-small" onClick={(m)=>setShowAddModal(!showAddModal)}>Add Signature</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map(function(datum, i){
                            return <tr>
                                <th>1</th>
                                <td>test</td>
                                <td>
                                    <button class="delete"></button>
                                </td>
                            </tr>
                        })}
                     </tbody>
                  </table>

                </p>
                {/*
                    return <div class="field has-addons pb-4" key={i}>
                        <p class="control is-expanded">
                            <input class={`${classNameText} is-centered`}
                                    name={name}
                                    type={type}
                             placeholder={placeholder}
                                   value={datum}
                                onChange={(e)=>onListInputFieldChange(e.target.value, i)}
                                disabled={disabled}
                            autoComplete="off"
                                   style={{maxWidth:maxWidth}}
                                disabled={disabled} />
                        </p>
                        <p class="control">
                            <button class="button is-danger" onClick={(e)=>onRemoveListInputFieldChange(i)} disabled={disabled}>
                                <FontAwesomeIcon className="fas" icon={faMinus} />
                            </button>
                        </p>
                    </div>
                */}
            </div>
        </>
    );
}

export default FormComicSignaturesTable;
