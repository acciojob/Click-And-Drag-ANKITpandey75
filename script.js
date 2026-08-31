const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

cubes.forEach(cube => {

    let isDragging = false;

    let offsetX = 0;
    let offsetY = 0;

    cube.addEventListener("mousedown", function (event) {

        isDragging = true;

        cube.classList.add("dragging");

        // Get cube and container positions
        const cubeRect = cube.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Calculate mouse position inside the cube
        offsetX = event.clientX - cubeRect.left;
        offsetY = event.clientY - cubeRect.top;

        // Change from grid positioning to absolute positioning
        cube.style.position = "absolute";

        // Calculate current position relative to container
        let currentLeft = cubeRect.left - containerRect.left;
        let currentTop = cubeRect.top - containerRect.top;

        cube.style.left = `${currentLeft}px`;
        cube.style.top = `${currentTop}px`;

        // Prevent text selection
        event.preventDefault();
    });

    document.addEventListener("mousemove", function (event) {

        if (!isDragging) {
            return;
        }

        const containerRect = container.getBoundingClientRect();
        const cubeRect = cube.getBoundingClientRect();

        // Calculate new position
        let newLeft =
            event.clientX -
            containerRect.left -
            offsetX;

        let newTop =
            event.clientY -
            containerRect.top -
            offsetY;

        // Container boundaries
        const maxLeft =
            container.clientWidth -
            cube.offsetWidth;

        const maxTop =
            container.clientHeight -
            cube.offsetHeight;

        // Keep cube inside container
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        // Update cube position
        cube.style.left = `${newLeft}px`;
        cube.style.top = `${newTop}px`;
    });

    document.addEventListener("mouseup", function () {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        cube.classList.remove("dragging");
    });

});