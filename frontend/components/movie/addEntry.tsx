import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { queryApiByTitle } from "@/helpers/api";
import classes from "../../styles/search.module.scss";
import { IAPIResponseItem } from "@/interfaces/APIInterfaces";

const AddEntry = () => {
  const [error, setError] = useState<string>("");
  const [entry, setEntry] = useState<string>("");
  const [response, setResponse] = useState<IAPIResponseItem[]>([]);
  console.log("Response for title", response);

  const hitAPI = async () => {
    const params = {
      title: entry,
      country: "us",
      show_type: "all",
      output_language: "en",
    };
    setResponse((await queryApiByTitle(entry, params)) || []);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    if (!isFormValid()) {
      return;
    }
    await hitAPI();
  };

  const handleSubmitViaEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const isFormValid = () => {
    // TODO: Verify if entry is sufficient before using a request
    return !(entry.length < 3);
  };
  return (
    <div>
      <div className={classes.searchContainer}>
        <FormControl tabIndex={0} onKeyUp={handleSubmitViaEnter}>
          {error}
          <TextField
            label={"Movie or Program"}
            variant={"outlined"}
            type={"text"}
            value={entry}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setEntry(e.target.value)}
          />

          <Button
            variant={"contained"}
            disabled={!isFormValid()}
            onClick={handleSubmit}
            type={"submit"}
          >
            +
          </Button>
        </FormControl>
      </div>
      {response.length ? (
        <div>
          <ul>
            {response.map((item: IAPIResponseItem, i: number) => {
              return (
                <li key={i}>
                  {item.title} <small>({item.type})</small>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>Search for something</div>
      )}
    </div>
  );
};

export default AddEntry;
