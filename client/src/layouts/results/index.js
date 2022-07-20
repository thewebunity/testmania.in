import { useState, useEffect, createRef } from "react";

// react-router-dom components
import { useParams, useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";
import ReactTable from "react-table";  

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// other pages
import PageLayout from "examples/LayoutContainers/PageLayout";
import Question from "layouts/exams/components/Question";

// Store
import { getExam } from "store/exams-slice";
import { notificationActions } from "store/notification-slice";
import './bars.css'
import $ from 'jquery';



import PDF from "react-to-pdf";




export default function Results(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [url, seturl] = useState(
    {
  
        url: '',
    }
  );
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/pages/logo`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
       
          seturl({...url, link: `${process.env.REACT_APP_IMAGE_CLOUD}/public/uploads/${result.logo.src}`});
        
        },
     
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);


  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const examsSlice = useSelector((state) => state.exams);

 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getExam(id));
      setIsLoading(false);
    };

    getData();
  }, []);

  const ref = createRef();
 function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff;
} 
$(".animated-progress span").each(function () {
  $(this).animate(
    {
      width: $(this).attr("data-progress") + "%",
    },
    1000
  );
  $(this).text($(this).attr("data-progress") + "%");
});
function FalseAnswer(){
  let i=0
  let cpt=0;
  for(i;i<examsSlice.exam.questions.length;i++){
    if(examsSlice.exam.questions[i].selectedAnswer!=null &&examsSlice.exam.questions[i].selectedAnswer!=examsSlice.exam.questions[i].answer){
      cpt++;
    }

  } 
  return cpt;
}
function NoRespense(){
  let i=0
  let cpt=0;
  for(i;i<examsSlice.exam.questions.length;i++){
    if(examsSlice.exam.questions[i].selectedAnswer==null){
      cpt++;
    }

  } 
  return cpt;
}
function attent(){
  let i=0
  let cpt=0;
  for(i;i<examsSlice.exam.questions.length;i++){
    if(examsSlice.exam.questions[i].selectedAnswer!=null){
      cpt++;
    }

  } 
  return cpt;
}
  
  return (
    <PageLayout>
      {/* Donwload pdf */}
      <PDF targetRef={ref} filename="results.pdf">
        {({ toPdf }) => (
          <MDBox display="flex" justifyContent="center" p={4}>
            <MDButton
              variant="contained"
              color="info"
              onClick={toPdf}
              style={{ marginTop: "1rem" }}
            >
              Download
            </MDButton>
          </MDBox>
        )}
      </PDF>
      {examsSlice.exam ? (
        <MDBox pt={1} pb={2} px={2} ref={ref}>



<div>
<div class="row">
		<div class="span5">
      <img src={url.link}  onClick={() => { navigate('/') }} />
            <table class="table table-striped table-condensed"  style={{width: '50%'}}>
               <thead>
                  <tr>
                      <th>Exam</th>
                      <th>Subject</th>
                      <th>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Student</th>
                      <th>Email</th>
                      <th>Time Taken </th>
                                                             
                  </tr>
              </thead>   
              <tbody>
                <tr>
                    <td>{examsSlice.exam.title} </td>
                    <td>{examsSlice.exam.subject.name} </td>
                    <td> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{auth.currentUser.name}</td>
                    <td> {auth.currentUser.email}</td>
                    <td>  {(dateDiff(new Date(examsSlice.exam.startedAt),new Date(examsSlice.exam.submittedAt))).hour}:
                    {(dateDiff(new Date(examsSlice.exam.startedAt),new Date(examsSlice.exam.submittedAt))).min}: 
                    {(dateDiff(new Date(examsSlice.exam.startedAt),new Date(examsSlice.exam.submittedAt))).sec}</td>
                  
                                                      
                </tr>
                                               
              </tbody>
            </table>
            </div>
	</div>
</div>
<MDBox my={2}>
          
          </MDBox>

          <MDBox my={2}>
            <MDTypography variant="h4" component="h2" gutterBottom>
              Score: {examsSlice.exam.score * examsSlice.exam.marks} /{" "}
              {examsSlice.exam.questions.length * examsSlice.exam.marks}
            </MDTypography>
          </MDBox>
          <MDTypography variant="h6" component="h2" gutterBottom>
              {new Date(examsSlice.exam.startedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </MDTypography>
        
          <MDBox my={2}>

          <table class="table table-striped table-condensed" style={{width: '50%'}}>
               <thead>
             
              </thead>   
              <tbody>
              <tr>
                      <td> Total No. Of Questions  </td>
                      <td> {examsSlice.exam.questions.length} </td>
                                                             
                  </tr>
                  <tr>
                      <td> Total No. Of Correct Answers </td>
                      <td>{examsSlice.exam.score}</td>
                                                             
                  </tr>
                <tr>
                    <td>   Total No. Of Wrong Answers  </td>
                    <td> {FalseAnswer()}  </td>
                                             
                </tr>
                <tr>
                    <td>   Total No. Of Question Not Attended  </td>
                    <td> {NoRespense()}   </td>
                                             
                </tr>
                <tr>
                    <td>    Total No. Of Question Attended  </td>
                    <td> {attent()}   </td>
                                             
                </tr>
                                               
              </tbody>
            </table>
      
          </MDBox>


       
          
      
         
         
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
          >
            {examsSlice.exam.questions.map((q, index) => {
              return (
                <Question
                  key={q._id}
                  questionId={q._id}
                  index={index}
                  description={q.description}
                  imageUrl={q.imageUrl}
                  question={q.question}
                  answer={q.answer}
                  selectedAnswer={q.selectedAnswer}
                  options={q.options}
                />
              );
            })}
          </MDBox>
        </MDBox>
      ) : (
        <MDBox pt={4} pb={3} px={3}>
          <MDTypography variant="subtitle2" color="text" display="inline-block">
            No questions yet.
          </MDTypography>
        </MDBox>
      )}
    </PageLayout>
  );
}
