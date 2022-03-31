import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import IncomeItems from '../../directory-components/directory/IncomeItem/IncomeItem';


const PageIncomeItems = () => {
   return (
      <DocumentTitle title='B-Fin: Справочник'>
         <div >
            <Sidebar />
            <IncomeItems />
         </div>
      </DocumentTitle>
   )
}
export default PageIncomeItems;