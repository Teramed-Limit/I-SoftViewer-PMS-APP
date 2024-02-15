import CustomActionsCell from '../CustomCell/CustomActionsCell/CustomActionsCell';
import ButtonCell from './ButtonCell/ButtonCell';
import CheckboxCell from './CheckboxCell/CheckboxCell';
import ChipCell from './ChipCell/ChipCell';
import DeleteRowCell from './DeleteRowCell/DeleteRowCell';
import EditRowCell from './EditRowCell/EditRowCell';
import IconButtonCell from './IconButtonCell/IconButtonCell';
import LinkCell from './LinkCell/LinkCell';
import StepperCell from './StepperCell/StepperCell';

export const CellMapper = {
	chipCell: ChipCell,
	checkboxCell: CheckboxCell,
	buttonCell: ButtonCell,
	linkCell: LinkCell,
	stepCell: StepperCell,
	iconButtonCell: IconButtonCell,
	customActionsCell: CustomActionsCell,
	// GridTableEditor
	editActionCell: EditRowCell,
	deleteActionCell: DeleteRowCell,
};
