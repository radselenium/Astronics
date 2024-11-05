import Header from "../Header"
import MessagingReport from "./MessagingReport"
import MessageSummary from "./MessageSummary"
const Dashboard = () => {
	return (
		<div class="d-flex flex-column flex-root app-root" id="kt_app_root">
			{/*begin::Page  */}
			<div class="app-page flex-column flex-column-fluid" id="kt_app_page">
					<div style={{position:"sticky"}}>
			 	 <Header activeMenuItem="dashboard"/>
				  </div>
					 <MessageSummary/>
			</div>
		</div>

	)
}
export default Dashboard