import React, { useContext, useState } from "react";
import urlContext from "../context/urlContext";
import Input from "./common/input";
function AddUrlForm() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const context = useContext(urlContext);
  let [localUrl, setLocalUrl] = useState(context.baseUrl.get);

  function handleChange(event) {
    setLocalUrl(event.target.value);
  }
  function handleSubmit(event) {
    setError(false);
    setSuccess(false);
    event.preventDefault();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + localUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          context.conference.set(result.data.links.conference);
          context.event.set(result.data.links.event);
          context.speaker.set(result.data.links.speaker);
          context.organizer.set(result.data.links.organizer);
          context.tag.set(result.data.links.tag);
          context.theme.set(result.data.links.theme);
          context.location.set(result.data.links.location);
          context.sponsor.set(result.data.links.sponsor);
          context.baseUrl.set(localUrl);
          setSuccess(true);
        },
        (error) => {
          setError(true);
        }
      );
  }
  return (
    <>
      <h1 className="col-md mt-5">Indtast API URL</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-md-4">
          <Input
            name="url"
            label="Indtast url til api"
            value={localUrl}
            helpText="Denne API har du muligvis modtaget i en slags backend, ik Mikkel?
            Her skal være en god forklarende tekst."
            onChange={handleChange}
          ></Input>

          <button className="btn btn-primary" type="submit">
            Gem
          </button>
        </div>
        {error && (
          <div className="col-md">
            <div role="alert" className="p-3 mb-2 mt-5 bg-danger text-white">
              Der skete en fejl da data skulle hentes, dette kan skyldes at
              linket til api'en er forkert. Url'en er ikke gemt.
            </div>
          </div>
        )}
        {success && (
          <div className="col-md">
            <div role="alert" className="p-3 mb-2 mt-5 bg-success text-white">
              Url'en blev gemt.
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default AddUrlForm;
