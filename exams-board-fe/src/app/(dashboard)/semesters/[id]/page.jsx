import EditSemester from './editSemester/page';
import ExamPaper from './examPaper/page';

export default async function SemesterAndExam({ params, searchParams }) {
     const {id} = await params;
    const {type} = await searchParams || null;

    if (!id) {
        return <p>Invalid semester ID.</p>;
    }

    try {
        const response = await fetch(`http://localhost:3000/semesters/${id}`, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Failed to fetch semester data');
        }

        const semester = await response.json();

        if (!semester) {
            return <p>No data available for this semester.</p>;
        }

        const semesterWithType = { ...semester, type };

        return (
            <div className="flex flex-col gap-2">
                <EditSemester semester={semesterWithType} />
                <ExamPaper semester={semesterWithType} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching semester data:', error);
        return <p>Failed to load semester data.</p>;
    }
}
