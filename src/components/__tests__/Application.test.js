import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(
      getByPlaceholderText(appointment, /enter student name/i),
      {
        target: { value: "Lydia Miller-Jones" },
      }
    );
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Lydia Miller-Jones")
    );

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(
      getByPlaceholderText(appointment, /enter student name/i),
      {
        target: { value: "Lydia Miller-Jones" },
      }
    );

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Cancel" button on that same appointment.
    fireEvent.click(getByText(appointment, "Cancel"));
    // 7. Check that the element with the text "Sylvia Palmer" is no longer in the DOM.
    expect(
      queryByText(appointment, "Sylvia Palmer")
    ).not.toBeInTheDocument();
    // 8. Check that the element with the text "Lydia Miller-Jones" is no longer in the DOM.
    expect(
      queryByText(appointment, "Lydia Miller-Jones")
    ).not.toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // 9. Check that the element with the text "1 spot remaining" is displayed for Monday.
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown "Delete the appointment?"
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // render the app
    const { container, debug } = render(<Application />);

    // wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // click on button with alt text "Edit"
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // on input with data-testid="student-name-input" change value to "Lydia Miller-Jones"
    fireEvent.change(
      getByPlaceholderText(appointment, /enter student name/i),
      {
        target: { value: "Lydia Miller-Jones" },
      }
    );

    // click on button with alt text "Save"
    fireEvent.click(queryByText(appointment, "Save"));

    // wait until the text "Saving" is displayed
    await waitForElement(() => getByText(appointment, "Saving"));

    // wait until the text "Lydia Miller-Jones" is displayed
    await waitForElement(() =>
      getByText(appointment, "Lydia Miller-Jones")
    );

    // check that the element with the text "Lydia Miller-Jones" is displayed
    expect(
      getByText(appointment, "Lydia Miller-Jones")
    ).toBeInTheDocument();

    // check that the DayListItem with the text "Monday" also has the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // render the app
    const { container } = render(<Application />);
    // wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // click on button with alt text "Edit"
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    axios.put.mockRejectedValueOnce();
    // click the save button and wait for the promise to reject
    fireEvent.click(queryByText(appointment, "Save"));
    await waitForElement(() => getByText(appointment, "Error"));

    // click the button with alt text of Close
    fireEvent.click(queryByAltText(appointment, "Close"));

    //check that appointment container contains the text "Archie Cohen"
    expect(
      getByText(appointment, "Archie Cohen")
    ).toBeInTheDocument();
  });

  it("shows the save error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Click the confirm button.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 5. Check that the element with the text "Deleting..." is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 6. Wait until the element with the text "Error" is displayed.

    await waitForElement(() => getByText(appointment, "Error"));
    expect(
      getByText(appointment, "Could not delete appointment")
    ).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));

    // 7. Check to see if the delete did not complete due to the error.
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
