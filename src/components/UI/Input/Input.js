import React from 'react';
import classes from './Input.css'


const input = (props) => {
    const inputClasses = [classes.Input];
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}
            />;

            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement}
                                     {...props.elementConfig}
                                     value={props.value}
                                     onChange={props.changed}
            />;

            break;
        case ('select'):
            inputElement = <select className={classes.InputElement}
                                   value={props.value}
                                   onChange={props.changed}
            >
                {props.elementConfig.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.display}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input className={classes.InputElement}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed}
            />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}


export default input;