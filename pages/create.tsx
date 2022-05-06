import { Box } from "@chakra-ui/react";
import AppEditorWindow from "../components/AppEditorWindow";

const CreatePage = () => {
  return (
    <>
      <Box>
        <AppEditorWindow editorId="createEditor" maxH="75vh" />
      </Box>
    </>
  );
};

export default CreatePage;
