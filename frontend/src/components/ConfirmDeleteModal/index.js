import { useDispatch } from 'react-redux';
import { removeSpot } from '../../store/spots';
import { useModal } from "../../context/Modal";

function ConfirmDeleteModal({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmDelete = async () => {
       dispatch(removeSpot(spotId))
       closeModal()
    };
  

    return (
        <div className="del-modal">
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to remove this spot from the listings?</h3>
        <button onClick={confirmDelete} className='button-orange delbutt'>Yes (Delete Spot)</button>
        <button onClick={closeModal} className='button-grey delbutt'>No (Keep Spot)</button>
        </div>
    )
}

export default ConfirmDeleteModal;