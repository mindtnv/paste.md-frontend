import React, { useEffect } from "react";
import { ChakraProps, FormLabel, Switch } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { loadFromLocalstorage, set } from "../app/settingsSlice";

export interface VimModeSwitcherProps extends ChakraProps {
  editorId: string;
}

const VimModeSwitcher = ({ editorId, ...props }: VimModeSwitcherProps) => {
  const isVimMode = useAppSelector((state) => state.settings.isVimMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFromLocalstorage(editorId));
  }, [dispatch, editorId]);

  return (
    <>
      <Switch
        colorScheme="orange"
        isChecked={isVimMode}
        size="lg"
        onChange={(e) =>
          dispatch(
            set({
              editorId: editorId,
              value: e.target.checked,
            })
          )
        }
        {...props}
        id={`${editorId}-vim-mode-switcher`}
      />
      <FormLabel htmlFor={`${editorId}-vim-mode-switcher`}>
        Enable VIM mode
      </FormLabel>
    </>
  );
};

export default VimModeSwitcher;
