import getStatus, { computeAverage, EnrollmentStatus } from './gradeUtils';

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

const getEnrollees = (): Promise<Enrollee[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success: boolean = true;
      if (success) {
        resolve(enrollees);
      } else {
        reject(new Error("Failed to connect to registrar API."));
      }
    }, 1000);
  });
};

function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

const main = async () => {
  try {
    let batchId: string | number = "BATCH-2026-03"; 
    if (typeof batchId === "string") {
      console.log(`Processing Batch ID (String): ${batchId.toUpperCase()}`);
    } else {
      console.log(`Processing Batch ID (Number): ${batchId}`);
    }

    const data: Enrollee[] = await getEnrollees();

    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");

    const reports: EligibilityReport[] = data.map((enrollee) => {
      const { name, prelim, midterm, final } = enrollee;
      const average = computeAverage(prelim, midterm, final);
      const status = getStatus(average);
      
      const report: EligibilityReport = { name, average, status };
      if (status === EnrollmentStatus.Probation) {
        report.remarks = "Needs consultation";
      }
      return report;
    });

    reports.forEach(({ name, average, status, remarks }) => {
      const remarkText = remarks ? ` ${remarks}` : "";
      console.log(`${name}\t\tAverage: ${average.toFixed(2)} ${status}${remarkText}`);
    });

    const grouped = groupBy(reports, (r) => r.status);
    const passingCount = grouped[EnrollmentStatus.Passing]?.length || 0;

    const totalSum = reports.reduce((acc, curr) => acc + curr.average, 0);
    const classAverage = totalSum / reports.length;

    console.log("-----------------------------------------------------");
    console.log(`Class Average: ${classAverage.toFixed(2)}`);
    console.log(`Passing: ${passingCount}/${reports.length}`);

  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

main();