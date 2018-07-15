import React from 'react';

export const Continue = ({ show, onContinue }) =>
show && <button onClick={onContinue}>Continue</button>
