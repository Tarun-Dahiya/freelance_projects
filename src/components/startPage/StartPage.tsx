const StartPage = () => {
    return (
        <div className='flex flex-col items-center mx-4'>
            <div className="bg-slate-100 dark:bg-slate-300 rounded-md my-5 w-full p-5 shadow-md">
                <form>
                    <h1>search form:</h1>
                    <input className="p-1 rounded-sm m-2" type="text" placeholder="search" />
                    <button className="btn-primary px-4 py-1 rounded-md">🔍</button>
                </form>
            </div>
            <div className="bg-slate-100 dark:bg-slate-300 rounded-md my-5 w-full p-5 shadow-md">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>john doe</td>
                            <td>jdoe@google.com</td>
                            <td>123-456-7890</td>
                        </tr>
                        <tr>
                            <td>john doe</td>
                            <td>jdoe@google.com</td>
                            <td>123-456-7890</td>
                        </tr>
                        <tr>
                            <td>john doe</td>
                            <td>jdoe@google.com</td>
                            <td>123-456-7890</td>
                        </tr>
                        <tr>
                            <td>john doe</td>
                            <td>jdoe@google.com</td>
                            <td>123-456-7890</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default StartPage;