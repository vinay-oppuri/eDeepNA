import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Dataset {
  id: string;
  name: string;
  createdAt: string | Date;
}

interface Props {
  datasets: Dataset[];
  onDatasetClick: (id: string) => void;
}

export function Datasets({ datasets, onDatasetClick }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {datasets.map((dataset) => (
        <Card
          key={dataset.id}
          className="cursor-pointer hover:shadow-md"
          onClick={() => onDatasetClick(dataset.id)}
        >
          <CardHeader>
            <CardTitle>{dataset.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Created:{" "}
              {new Date(dataset.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
