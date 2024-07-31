import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLoader } from '@fortawesome/pro-duotone-svg-icons';

const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-md mt-5 min-h-[85vh]">
            <img src="./media/logos/RWGBanner.gif" alt="logo" className="w-40" />
            <div className='flex items-center justify-center'>
                <h1 className='me-2 text-xs text-gray-600'>Loading...</h1>
                <FontAwesomeIcon icon={faLoader} className='animate-spin text-gray-600' />
            </div>

        </div>
    );
}
export default LoadingPage;