export default function BookingProgress(props: any) {
    
    return (
      <>
        <section className="customer-details-area">
            <div className="container">
                <div className="row">
                <div className="col-12">
                    <div className="customer-details-content">
                    
                    <div className="content">
                        <h2 className="title">
                        {props.title}
                        </h2>
                        <div className="customer-progress-wrap">
                        <div className="progress">
                            <div
                            className="progress-bar"
                            role="progressbar"
                            style={props.pbar}
                            aria-valuenow={props.value}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            />
                        </div>
                        <div className="customer-progress-step">
                            <ul>
                            <li>
                                <span>1</span>
                                <p>Flight search</p>
                            </li>
                            <li>
                                <span>2</span>
                                <p>Trip Info & Options</p>
                            </li>
                            <li>
                                <span>3</span>
                                <p>Payment</p>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
      </>
   )
}