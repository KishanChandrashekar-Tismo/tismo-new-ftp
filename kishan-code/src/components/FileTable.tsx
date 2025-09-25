import { PathNode } from "@/lib/types";
import { getFileIcon } from "@/lib/fileIcons";

interface FileTableProps {
  files: PathNode[];
  onSelect: (item: PathNode) => void;
}

export default function FileTable({ files, onSelect }: FileTableProps) {
  const formatFileSize = (size: number) => {
    if (size === 0) return "-";
    const units = ["B", "KB", "MB", "GB"];
    let unitIndex = 0;
    let fileSize = size;

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }

    return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="table-container">
      <table className="table card">
        <thead>
          <tr>
            <th>Name</th>
            <th>Modified Date</th>
            <th>File Size</th>
          </tr>
        </thead>
      </table>
      <div className="table-body-container">
        <table className="table card">
          <tbody>
            {files.map((file, index) => (
              <tr
                key={`${file.name}-${index}`}
                onClick={() => onSelect(file)}
                className="file-row"
              >
                <td>
                  {file.isFolder ? (
                    <span
                      className="file-icon"
                      title="Folder"
                    >
                      {getFileIcon(file.name, file.isFolder)}
                    </span>
                  ) : (
                    <span
                      className={`file-icon ${getFileIcon(
                        file.name,
                        file.isFolder
                      )}`}
                      title={`${
                        file.name.split(".").pop()?.toUpperCase() || "File"
                      } file`}
                    ></span>
                  )}
                  <span className="file-name">{file.name}</span>
                </td>
                <td>{formatDate(file.createdOn)}</td>
                <td>{file.isFolder ? "-" : formatFileSize(file.size)}</td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr>
                <td colSpan={3} className="empty-message">
                  No files or folders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
