import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const ModalComponent = ({ visibleColumns, onClose, onSubmit }) => {
  const [selectedColumns, setSelectedColumns] = useState({ ...visibleColumns });

  const handleCheckboxChange = (column) => {
    setSelectedColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  const handleModalSubmit = () => {
    onSubmit(selectedColumns);
  };

  return (
    <Dialog header="Select Columns" visible={true} onHide={onClose} style={{ width: '30%' }}>
      <form>
        {Object.keys(visibleColumns).map((column) => (
          <div key={column} className="p-field-checkbox">
            <input
              type="checkbox"
              id={column}
              checked={selectedColumns[column]}
              onChange={() => handleCheckboxChange(column)}
            />
            <label htmlFor={column}>{` ${column}`}</label>
          </div>
        ))}
        <div className="p-mt-2">
          <Button label="Submit" onClick={handleModalSubmit} />
        </div>
      </form>
    </Dialog>
  );
};

export default ModalComponent;
