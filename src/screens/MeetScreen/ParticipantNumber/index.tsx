import { useParticipantCounts } from "@daily-co/daily-react";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { FaPlus, FaUserFriends } from "react-icons/fa";

export default function ParticipantNumber() {
  const { present, hidden } = useParticipantCounts();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl text-gray-500">
        <FaUserFriends size={20} />
        <span className="text-sm">{present + hidden}</span>
      </div>
      <div
        className="flex items-center gap-2 bg-green-400 px-4 py-2 rounded-3xl text-white cursor-pointer"
        onClick={() => props.setOpenModal("default")}
      >
        <FaPlus size={20} />
        <span className="text-sm">Thêm thành viên</span>
      </div>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Mời thành viên qua đường dẫn</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {location.href}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
