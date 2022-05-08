import React, { useEffect } from "react";
import { ChakraProps, FormLabel, Switch } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";
import { loadSettingsFromLocalstorage, set } from "../app/settingsSlice";

export interface VimModeSwitcherProps extends ChakraProps {}

const VimModeSwitcher = ({ ...props }: VimModeSwitcherProps) => {
  const isVimMode = useAppSelector((state) => state.settings.isVimMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSettingsFromLocalstorage());
  }, [dispatch]);

  return (
    <>
      <Switch
        colorScheme="orange"
        isChecked={isVimMode}
        size="lg"
        onChange={(e) =>
          dispatch(
            set({
              value: e.target.checked,
            })
          )
        }
        {...props}
        id={`vim-mode-switcher`}
      />
      <FormLabel htmlFor={`vim-mode-switcher`}>Enable VIM mode</FormLabel>
    </>
  );
};

export default VimModeSwitcher;
