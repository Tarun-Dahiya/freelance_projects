import SearchForm from './SearchForm';
import SampleTable from './SampleTable';

const StartPage = () => {
    return (
        <div className='flex flex-col items-center mx-4'>
            <SearchForm />
            <SampleTable />
        </div>
    );
}
export default StartPage;