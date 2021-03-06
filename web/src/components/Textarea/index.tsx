import React, { TextareaHTMLAttributes } from 'react';

import './styles.min.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({label, name, ...rest}) => (
  <div className="textarea-block">
    <label htmlFor="{name}">{label}</label>
    <textarea id="{name}" {...rest} />
  </div>
)

export default Textarea;