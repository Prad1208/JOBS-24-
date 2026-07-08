function SearchFilter({
    search,
    setSearch,
    status,
    setStatus
}) {


    return (

        <div className="container mt-4">

            <div className="row">


                <div className="col-md-6">

                    <input
                    className="form-control"
                    placeholder="Search company or role"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    />

                </div>


                <div className="col-md-6">

                    <select
                    className="form-control"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                    >

                        <option value="">
                            All Status
                        </option>

                        <option>
                            APPLIED
                        </option>

                        <option>
                            INTERVIEW
                        </option>

                        <option>
                            OFFER
                        </option>

                        <option>
                            REJECTED
                        </option>

                    </select>

                </div>


            </div>

        </div>

    );
}

export default SearchFilter;