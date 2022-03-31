import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Income from "../../reports/linksOfReports/Income";


const PageIncome = () => {
  return (
    <DocumentTitle title='B-Fin: Доходы'>
      <div >
        <Sidebar />
        <Income />
      </div>
    </DocumentTitle>
  )
}
export default PageIncome;