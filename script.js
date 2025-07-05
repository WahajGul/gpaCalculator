// const inputs = [];
const loadPrev = document.querySelector("#loadPrevious");

const form002 = document.querySelector("#form002");

form001.onsubmit = (e) => {
	e.preventDefault();
	const NoOfSubjectsI = parseInt(document.querySelector("#NoOfSubjects").value);
	const noOfLabsI = parseInt(document.querySelector("#noOfLabs").value);

	localStorage.setItem("NoOfSubjectsI", JSON.stringify(NoOfSubjectsI));
	localStorage.setItem("NoOfLabsI", JSON.stringify(noOfLabsI));

	console.log(
		JSON.parse(localStorage.getItem("NoOfSubjectsI")) +
			" " +
			JSON.parse(localStorage.getItem("NoOfLabsI")),
	);

	if (!NoOfSubjectsI || !noOfLabsI) {
		alert("invalid number");
	}

	console.log(NoOfSubjectsI + " " + noOfLabsI);
	addInputs(form002, NoOfSubjectsI, noOfLabsI);
	document.querySelector("#form001 button").disabled = true;
};

form002.onsubmit = (e) => {
	e.preventDefault();
	const g = objFromInputs(
		Array.from(document.querySelectorAll("#form002 input")),
	);
	localStorage.setItem("marksTable", JSON.stringify(g));
	console.log(g);
	addTable(g);
};

const addInputs = (form, NoOfSubjects, noOfLabs) => {
	for (i = 0; i < NoOfSubjects; i++) {
		const inputTag = document.createElement("input");
		inputTag.type = "text";
		inputTag.placeholder = "Sub Name";
		inputTag.id = `subName${i}`;

		const inputTagGr = document.createElement("input");
		inputTagGr.type = "text";
		inputTagGr.placeholder = "Sub Grade";
		inputTagGr.id = `subGrade${i}`;

		const inputTagCr = document.createElement("input");
		inputTagCr.type = "number";
		inputTagCr.placeholder = "Sub CR";
		inputTagCr.id = `SubCr${i}`;
		inputTagCr.value = 3.0;

		form.appendChild(inputTag);
		form.appendChild(inputTagGr);
		form.appendChild(inputTagCr);
	}

	for (i = 0; i < noOfLabs; i++) {
		const inputTag = document.createElement("input");
		inputTag.type = "text";
		inputTag.placeholder = "Lab Name";
		inputTag.id = `labName${i}`;

		const inputTagGr = document.createElement("input");
		inputTagGr.type = "text";
		inputTagGr.placeholder = "Lab Grade";
		inputTagGr.id = `labGrade${i}`;

		const inputTagCr = document.createElement("input");
		inputTagCr.type = "number";
		inputTagCr.placeholder = "Lab CR";
		inputTagCr.id = `labCr${i}`;
		inputTagCr.value = 1.0;

		form.appendChild(inputTag);
		form.appendChild(inputTagGr);
		form.appendChild(inputTagCr);
	}
	const subBtn = document.createElement("button");
	subBtn.type = "submit";
	subBtn.textContent = "Calculate";
	form.appendChild(subBtn);
};

const addTable = (g) => {
	console.log(g);
	let sumOfGrade = 0;
	let sumOfCr = 0;
	for (i = 0; i < g.length; i++) {
		sumOfGrade += g[i].gradepoint;
		sumOfCr += g[i].cr;
	}
	const div = document.createElement("div");
	div.className = "container002";
	document.querySelector(".container").appendChild(div);
	div.className = "container02";
	div.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>CR</th>
              <th>GP</th>
            </tr>
          </thead>
          <tbody>
        ${g
					.map((row) => {
						return `
                <tr>
                <td>${row.name}</td>
                <td>${row.grade}</td>
                <td>${row.cr}</td>
                <td>${row.gradeValue} x ${row.cr} = ${row.gradepoint.toFixed(2)}</td>
                </tr>
                `;
					})
					.join("")}
          </tbody>
        <tfoot>
        <tr>
        <th>Total</th>
        <th colspan="3">${sumOfGrade}/${sumOfCr}=${sumOfGrade / sumOfCr}</th>
        </tr>
        </tfoot>
        </table>
    `;
};

loadPrev.onclick = () => {
	if (JSON.parse(localStorage.getItem("marksTable"))) {
		addTable(JSON.parse(localStorage.getItem("marksTable")));
	} else {
		alert("not available");
	}
};

const objFromInputs = (array) => {
	const temp = [];
	for (i = 0; i < array.length; i += 3) {
		const obj = {
			name: array[i].value,
			grade: array[i + 1].value,
			gradeValue: gradeToNumber(array[i + 1].value),
			gradepoint:
				gradeToNumber(array[i + 1].value) * parseInt(array[i + 2].value),
			cr: parseInt(array[i + 2].value),
		};
		temp.push(obj);
	}
	return temp;
};

function gradeToNumber(grade) {
	switch (grade) {
		case "F":
			return 0;
		case "C-":
			return 1.66;
		case "C":
			return 2.0;
		case "C+":
			return 2.33;
		case "B-":
			return 2.66;
		case "B":
			return 3.0;
		case "B+":
			return 3.33;
		case "A-":
			return 3.66;
		case "A":
			return 3.99;
		default:
			alert("invalid input using 0 instead");
			return 0;
	}
}
