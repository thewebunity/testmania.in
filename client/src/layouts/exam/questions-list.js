import Icon from "@mui/material/Icon";

import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

export default function QuestionsList(props) {
  return (
    <>
      <MDBox
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexWrap="wrap"
      >
        {props.questions.map((item, index) => {
          return (
            <MDBox m={0.5} key={index}>
              <MDButton
                px={1}
                py={2}
                variant={
                  props.currentIndex === index ? "contained" : "outlined"
                }
                color={props.currentIndex === index ? "success" : "secondary"}
                onClick={() => props.onChange(index)}
                startIcon={item.isFlagged ? <Icon>bookmark</Icon> : null}
                endIcon={item.selectedAnswer ? <Icon>check</Icon> : null}
              >
                {index + 1}
              </MDButton>
            </MDBox>
          );
        })}
      </MDBox>
    </>
  );
}
