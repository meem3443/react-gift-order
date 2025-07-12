import { useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  receiversFormSchema,
  type ReceiverField,
  type ReceiversFormValues,
} from "../schemas/receiverSchema";

interface ReceiverProps {
  initialReceivers?: ReceiverField[];

  onReceiversUpdate: (receivers: ReceiverField[]) => void;
  onCancel: () => void;
}

const Receiver = ({
  initialReceivers = [],
  onReceiversUpdate,
  onCancel,
}: ReceiverProps) => {
  const [isEditing, setIsEditing] = useState(initialReceivers.length === 0);

  const [savedReceivers, setSavedReceivers] =
    useState<ReceiverField[]>(initialReceivers);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ReceiversFormValues>({
    resolver: zodResolver(receiversFormSchema),
    defaultValues: {
      receivers: initialReceivers.length > 0 ? initialReceivers : [],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "receivers",
  });

  const watchAllFields = watch("receivers");

  const handleAddReceiverField = () => {
    if (fields.length < 10) {
      append({ name: "", phone: "", quantity: 1 });
    } else {
      alert("최대 10명까지 추가할 수 있습니다.");
    }
  };

  const handleDeleteReceiverField = (index: number) => {
    remove(index);
  };

  const handleFormSubmit: SubmitHandler<ReceiversFormValues> = (data) => {
    setSavedReceivers(data.receivers);

    setIsEditing(false);

    onReceiversUpdate(data.receivers);
  };

  const handleEditMode = () => {
    setIsEditing(true);

    reset({ receivers: savedReceivers });
  };

  const handleCancelForm = () => {
    if (savedReceivers.length > 0) {
      setIsEditing(false);

      reset({ receivers: savedReceivers });
    } else {
      onCancel();
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      {/* 헤더 섹션: '받는 사람' 제목과 '추가'/'수정' 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">받는 사람</h2>
        {isEditing ? (
          <button
            type="button"
            onClick={handleCancelForm}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
          >
            취소
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEditMode}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
          >
            수정
          </button>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          {fields.length === 0 && (
            <div className="flex-grow flex items-center justify-center text-center text-gray-500 border border-gray-300 rounded-lg p-6 mb-4">
              <p>
                받는 사람이 없습니다.
                <br />
                받는 사람을 추가해주세요.
              </p>
            </div>
          )}

          {/* 받는 사람이 있을 때 표시되는 UI (주의사항 및 추가하기 버튼) */}
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              * 최대 10명까지 추가 할 수 있어요.
            </p>
            <p className="text-gray-600 mb-4">
              * 받는 사람의 전화번호를 중복으로 입력할 수 없어요.
            </p>
            <button
              type="button"
              onClick={handleAddReceiverField}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
            >
              추가하기
            </button>
          </div>

          {/* 동적으로 추가되는 받는 사람 입력 필드 목록 */}
          <div className="space-y-4 mb-6">
            {" "}
            {/* mb-6 추가로 버튼과의 간격 확보 */}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-300 rounded-lg p-4 relative"
              >
                <button
                  type="button"
                  onClick={() => handleDeleteReceiverField(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                  aria-label="Remove receiver"
                >
                  &times;
                </button>
                <h3 className="font-semibold mb-2">받는 사람 {index + 1}</h3>

                <div className="mb-3">
                  <label
                    htmlFor={`receivers.${index}.name`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    이름
                  </label>
                  <input
                    id={`receivers.${index}.name`}
                    type="text"
                    {...register(`receivers.${index}.name`)}
                    placeholder="이름을 입력해주세요."
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.receivers?.[index]?.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.receivers?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.receivers[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor={`receivers.${index}.phone`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    전화번호
                  </label>
                  <input
                    id={`receivers.${index}.phone`}
                    type="tel"
                    {...register(`receivers.${index}.phone`)}
                    placeholder="전화번호를 입력해주세요"
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.receivers?.[index]?.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.receivers?.[index]?.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.receivers[index]?.phone?.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor={`receivers.${index}.quantity`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    수량
                  </label>
                  <input
                    id={`receivers.${index}.quantity`}
                    type="number"
                    {...register(`receivers.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    placeholder="구매 수량을 입력하세요"
                    min="1"
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.receivers?.[index]?.quantity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.receivers?.[index]?.quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.receivers[index]?.quantity?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 하단 고정 버튼 (완료) - 편집 모드에서만 보임 */}
          <div className="flex justify-center mt-auto">
            {" "}
            {/* 버튼을 중앙으로 정렬 */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-500"
            >
              {`${watchAllFields?.length || 0}명 완료`}
            </button>
          </div>
        </form>
      ) : (
        <div>
          {savedReceivers.length === 0 ? (
            <div className="text-center text-gray-500 border border-gray-300 rounded-lg p-6">
              <p>
                등록된 받는 사람이 없습니다.
                <br />
                수정 버튼을 눌러 추가해주세요.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">이름</th>
                    <th className="py-3 px-6 text-left">전화번호</th>
                    <th className="py-3 px-6 text-left">수량</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {savedReceivers.map((receiver, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {receiver.name}
                      </td>
                      <td className="py-3 px-6 text-left">{receiver.phone}</td>
                      <td className="py-3 px-6 text-left">
                        {receiver.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Receiver;
