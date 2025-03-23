document.addEventListener("DOMContentLoaded", () => {
    // Array de objetos que contiene las preguntas, opciones y respuestas correctas.
    const questions = [
        {
            question: "¿En qué año se fundó el Rayo Vallecano?",
            options: ["1924", "1930", "1945", "1950"],
            answer: "1924"
        },
        {
            question: "¿Cuál es el estadio del Rayo Vallecano?",
            options: ["Teresa Rivero", "Vallecanfield", "Estadio de Vallecas", "Payaso Fofó"],
            answer: "Estadio de Vallecas"
        },
        {
            question: "¿Qué color identifica al Rayo Vallecano?",
            options: ["Rojo y gris", "Azul y blanco", "Blanco y negro", "Franjirrojo"],
            answer: "Franjirrojo"
        },
        {
            question: "¿En qué década el Rayo Vallecano ascendió por primera vez a Primera División?",
            options: ["1950s", "1960s", "1970s", "1980s"],
            answer: "1970s"
        },
        {
            question: "¿Quién es el máximo goleador histórico del Rayo Vallecano?",
            options: ["Raúl Tamudo", "Michel", "Piti", "Bolo"],
            answer: "Michel"
        },
        {
            question: "¿En qué temporada el Rayo Vallecano participó por primera vez en una competición europea?",
            options: ["2000-01", "1998-99", "2007-08", "Nunca ha participado"],
            answer: "2000-01"
        },
        {
            question: "¿Qué entrenador llevó al Rayo Vallecano a su mejor clasificación en LaLiga?",
            options: ["Julián Rubio", "José Ramón Sandoval", "Andoni Iraola", "Paco Jémez"],
            answer: "Paco Jémez"
        },
        {
            question: "¿En qué año el Rayo Vallecano ganó la Copa del Rey?",
            options: ["1980", "1984", "1990", "Nunca ha ganado"],
            answer: "Nunca ha ganado"
        },
        {
            question: "¿Qué jugador del Rayo Vallecano ha disputado más partidos con el club?",
            options: ["Raúl Tamudo", "Piti", "Roberto Trashorras", "Trejo"],
            answer: "Roberto Trashorras"
        },
        {
            question: "¿Qué posición ocupó el Rayo Vallecano en la temporada 2020-2021?",
            options: ["1ª", "6ª", "12ª", "18ª"],
            answer: "6ª"
        }
    ];
    // Variables para rastrear la pregunta actual y la puntuación del usuario.
    let currentQuestionIndex = 0; // Índice de la pregunta actual.
    let score = 0; // Puntuación del usuario.

    const questionElement = document.getElementById("question"); // Elemento que muestra la pregunta.
    const optionsContainer = document.getElementById("options-container"); // Contenedor de las opciones de respuesta.
    const nextButton = document.getElementById("next-button"); // Botón "Siguiente".
    const counterElement = document.getElementById("counter"); // Elemento que muestra el contador de preguntas.
    const resultContainer = document.getElementById("result-container"); // Contenedor del resultado final.
    const scoreElement = document.getElementById("score"); // Elemento que muestra la puntuación final.

    // Función para mostrar la pregunta actual y sus opciones.
    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex]; // Obtiene la pregunta actual.
        questionElement.textContent = currentQuestion.question; // Muestra la pregunta en el DOM.
        optionsContainer.innerHTML = ""; // Limpia las opciones anteriores.

        // Itera sobre las opciones de la pregunta actual.
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button"); // Crea un botón para cada opción.
            button.textContent = option; // Asigna el texto de la opción al botón.
            button.classList.add("option"); // Añade una clase CSS al botón.
            button.addEventListener("click", () => selectAnswer(option)); // Añade un evento para manejar la selección de la opción.
            optionsContainer.appendChild(button); // Añade el botón al contenedor de opciones
        });

        // Actualiza el contador de preguntas.
        counterElement.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    }

    // Función para validar la respuesta seleccionada
    function selectAnswer(selectedOption) {
        const currentQuestion = questions[currentQuestionIndex]; // Obtiene la pregunta actual.

        const optionButtons = optionsContainer.querySelectorAll("button"); // Obtiene todos los botones de opciones.
        optionButtons.forEach(button => {
            button.disabled = true; // Deshabilita los botones después de seleccionar una respuesta.

            // Marca la opción seleccionada por el usuario.
            if (button.textContent === selectedOption) {
                button.classList.add("selected");

                // Verifica si la opción seleccionada es correcta.
                if (selectedOption === currentQuestion.answer) {
                    button.classList.remove("selected");
                    button.classList.add("correct"); // Marca la opción como correcta.
                    score++; // Incrementa la puntuación.
                } else {
                    button.classList.add("incorrect"); // Marca la opción como incorrecta.
                }
            } else if (button.textContent === currentQuestion.answer) {
                // Marca la respuesta correcta si el usuario selecciona una opción incorrecta.
                button.classList.add("correct");
            }
        });

        nextButton.disabled = false; // Habilita el botón "Siguiente".
    }
    // Función para mostrar el resultado final
    function showResult() {
        questionElement.style.display = "none"; // Oculta la pregunta.
        optionsContainer.style.display = "none"; // Oculta las opciones.
        nextButton.style.display = "none"; // Oculta el botón "Siguiente".
        counterElement.style.display = "none"; // Oculta el contador de preguntas.

        resultContainer.style.display = "block"; // Muestra el contenedor de resultados.
        scoreElement.textContent = `Obtuviste ${score} de ${questions.length} respuestas correctas.`;// Muestra la puntuación final.
    }

    // Evento para el botón "Siguiente"
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;  // Avanza a la siguiente pregunta.
        if (currentQuestionIndex < questions.length) {
            showQuestion();// Muestra la siguiente pregunta.
            nextButton.disabled = true; // Deshabilitar el botón "Siguiente" hasta que se seleccione una respuesta
        } else {
            showResult();// Muestra el resultado final si no hay más preguntas.
        }
    });

    // Inicializa el cuestionario mostrando la primera pregunta.
    showQuestion();
    nextButton.disabled = true; // Deshabilitar el botón "Siguiente" al inicio
});