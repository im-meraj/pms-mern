import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllGrades } from "../features/grade/gradeSlice";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const GradeTableComponent = () => {
  const { grades, isLoading } = useSelector((state) => state.grade);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="table__container">
        {grades.length > 0 ? (
          <table className="table" cellPadding={5} cellSpacing={30}>
            <thead>
              <tr>
                <th>Pay Grade ID</th>
                <th>Pay Grade Name</th>
                <th>Basic Salary</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.gradeId}</td>
                  <td>{grade.gradeName}</td>
                  <td>{grade.basic}</td>
                  <td>
                    <Link to={`/admin/editGrade/${grade._id}`}>
                      <button className="btn-secondary btn-edit" style={{ fontSize: '12px' }}><FiEdit /></button>
                    </Link>
                    <button className="btn-danger btn-delete" style={{ fontSize: '12px' }} onClick={() => {
                      // dispatch(deleteDesignation(grade._id));
                      dispatch(getAllGrades());
                    }}><RiDeleteBin6Line /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (<h3>No Pay Grades</h3>)}
      </div>
    </>
  )
}

export default GradeTableComponent