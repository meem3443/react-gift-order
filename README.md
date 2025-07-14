## 핵심 기능 요구사항

### [v] 주문하기 페이지의 폼을 React Hook Form을 사용해서 리팩터링해요. (form 데이터를 useState로 다루는 경우는 없게 해요.)

- **구현 내용:** `useForm`, `useFieldArray`, `handleSubmit` 등 React Hook Form의 API를 사용하여 폼 상태 관리 및 제출 로직을 구현했습니다. `useState`는 `isEditing`과 `savedReceivers` 등 UI 상태 관리에만 사용되고, 폼 데이터 자체는 React Hook Form에 의해 관리됩니다.

### [v] 받는 사람을 최대 10명까지 등록 가능하게 해요.

- **구현 내용:** `handleAddReceiverField` 함수에서 `fields.length < 10` 조건을 통해 추가 가능한 받는 사람 수를 10명으로 제한하고, 초과 시 알림 메시지를 표시합니다.

### [v] 10명의 정보가 정확하게 입력되지 않으면 정보가 반영되지 않아요.

- **구현 내용:** `zodResolver(receiversFormSchema)`를 통해 Zod 스키마를 기반으로 폼 전체의 유효성을 검사합니다. `handleSubmit`은 모든 필드가 유효성 검사를 통과했을 때만 `handleFormSubmit`을 호출하므로, 불완전한 정보는 저장되지 않습니다.

### [v] 받는 사람의 전화번호가 중복되면 안 돼요.

- **구현 내용:** `receiversFormSchema` (코드 외부에 정의된 Zod 스키마)에서 전화번호 필드의 유효성 검사 시 `refine` 메서드를 사용하여 전화번호 중복 여부를 검증하도록 구현되어 있습니다.

### [v] 최소 선택 수량은 1개 이상이어야 해요.

- **구현 내용:** 각 받는 사람의 `quantity` 필드에 대해 `min="1"` 속성을 부여하고, Zod 스키마(`receiversFormSchema`)에서 해당 필드의 최소값을 1로 설정하여 유효성을 검사합니다.

### [v] 전화번호는 01012341234 형태로만 받을 수 있어요.

- **구현 내용:** `receiversFormSchema` (Zod 스키마)에서 전화번호 필드에 대해 정규식 패턴 검사를 포함한 유효성 규칙을 적용하여 '01012341234'와 같은 10~11자리 숫자 형식만 허용하도록 정의되어 있습니다.

### [v] (선택) 유효성 검사를 Zod 라이브러리를 사용해서 처리해요.

- **구현 내용:** `zodResolver`를 `useForm`에 적용하고, `receiversFormSchema`라는 Zod 스키마를 임포트하여 전체 폼의 유효성 검사를 Zod로 처리하고 있습니다.
