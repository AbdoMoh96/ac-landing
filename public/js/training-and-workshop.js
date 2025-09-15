window.onload = function (){
    const courseSelectors = document.querySelectorAll('[data-category-selector]');
    const courses = document.querySelectorAll('[data-category-courses]');
    courseSelectors[0].classList.remove('border-[#1B1B1B1A]');
    courseSelectors[0].classList.add('border-[#00A1C5]', 'text-[#00A1C5]');

    const heighLightSelector = (category) => {
        courseSelectors.forEach(courseSelector => {
            let currentCategory = courseSelector.getAttribute('data-category-selector');
            if (currentCategory === category) {
                courseSelector.classList.remove('border-[#1B1B1B1A]');
                courseSelector.classList.add('border-[#00A1C5]', 'text-[#00A1C5]');
            }else {
                courseSelector.classList.add('border-[#1B1B1B1A]');
                courseSelector.classList.remove('border-[#00A1C5]', 'text-[#00A1C5]');
            }
        });
    }

    const setCourseCategory = (selector) => {
        const category = selector.getAttribute('data-category-selector');
        let noCoursesFound = true;
        heighLightSelector(category);
        courses.forEach(course => {
            let currentCategory = course.getAttribute('data-category-courses');
            if (currentCategory === category) {
                noCoursesFound = false;
                course.classList.remove('hidden');
            }else {
                course.classList.add('hidden');
            }
        });

        if (noCoursesFound) {
            heighLightSelector('all-recommendations');
            courses.forEach(course => {
                course.classList.remove('hidden');
            });
        }
    }
    courseSelectors.forEach(courseSelector => courseSelector.addEventListener('click', (event) => setCourseCategory(event.target)));
};