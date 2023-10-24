document.addEventListener('DOMContentLoaded', () => {
    const getStartedButton = document.querySelector("#get-started");
    const emailInput = document.querySelector("#email");
    const roomInput = document.querySelector("#room");

    getStartedButton.addEventListener("click", () => {
        const email = emailInput.value;
        const room = roomInput.value;

        // Redirect the user to the video call page with the provided email and room ID
        window.location.href = `/video_call/${email}/${room}`;
    });
});

