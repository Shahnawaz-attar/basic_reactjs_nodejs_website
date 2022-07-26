

function UserForm() {
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>User Form</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>

  );
}

export default UserForm;