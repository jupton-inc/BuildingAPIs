$(document).ready(() => {
    fetchChirps();
});

const fetchChirps = () => {
    $("#chirp-container").empty();

    $.get("/api/chirps/", (chirps) => {
        delete chirps.nextid
        const writeArr = Object.entries(chirps);
        console.log(writeArr);
        writeArr.reverse();
        writeArr.forEach(chirp => {
            $("#chirp-container").append(
                `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${chirp[1].username}</h5>
                        <p class="card-text">${chirp[1].message}</p>
                        <img onclick="deleteChirp(${chirp[0]})" class="close-btn" src="http://www.niralisinks.com/wp-content/uploads/2018/07/close_button_2-512.png" />
                        <img onclick="" data-toggle="modal" data-target="#modal${chirp[0]}" class="edit-btn" src="https://github.com/joshua-hurn/chirpr_class/blob/master/client/assets/edit.png?raw=true" />
                    </div>
                </div>
                <div id="modal${chirp[0]}" class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${chirp[1].username}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <textarea id="edit-chirp-message${chirp[0]}">${chirp[1].message}</textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onclick="editChirp(${chirp[0]}, '${chirp[1].username}', $('#edit-chirp-message${chirp[0]}').val())" type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            )
        });
    });
};

const submitChirp = () => {
    const username = $("#username").val();
    const message = $("#message").val();
    const data = {
        username: username,
        message: message
    };

    $.ajax("/api/chirps/", {
        data: JSON.stringify(data),
        method: "post",
        contentType: "application/json"
    });

    fetchChirps();
};

const deleteChirp = id => {
    $.ajax(`/api/chirps/${id}`, { method: "delete" });
    
    fetchChirps();
};

const editChirp = (id, user, message) => {
    const chirpObj = {
        username: user,
        message: message
    }
    $.ajax(`/api/chirps/${id}`, {
        data: JSON.stringify(chirpObj),
        method: "put",
        contentType: "application/json"
    });

    fetchChirps();
};