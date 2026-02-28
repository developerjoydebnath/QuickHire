export class JobCategory {
  id: string | null;
  name: string;
  slug: string;
  icon_name: string;
  constructor(data: any = {}) {
    this.id = data._id ?? null;
    this.name = data.name ?? '';
    this.slug = data.slug ?? '';
    this.icon_name = data.icon_name ?? '';
  }
}

export class LocationModel {
  id: string | null;
  state: string;
  country: string;
  constructor(data: any = {}) {
    this.id = data._id ?? null;
    this.state = data.state ?? '';
    this.country = data.country ?? '';
  }
}

export class Company {
  id: string | null;
  name: string;
  image_url: string;
  location: LocationModel | null;
  constructor(data: any = {}) {
    this.id = data._id ?? null;
    this.name = data.name ?? '';
    this.image_url = data.image_url ?? '';
    this.location = data.location ? new LocationModel(data.location) : null;
  }
}

export class JobType {
  id: string | null;
  name: string;
  slug: string;
  constructor(data: any = {}) {
    this.id = data._id ?? null;
    this.name = data.name ?? '';
    this.slug = data.slug ?? '';
  }
}

export class Job {
  id: string | null;
  title: string;
  description: string;
  image_url: string;
  categories: JobCategory[];
  location: LocationModel | null;
  company: Company | null;
  salary_range: string;
  job_type: JobType | null;
  deadline: string;
  isFeatured: boolean;
  constructor(data: any = {}) {
    this.id = data._id ?? null;
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.image_url = data.image_url ?? '';
    this.categories = data.categories ? data.categories.map((c: any) => new JobCategory(c)) : [];
    this.location = data.location ? new LocationModel(data.location) : null;
    this.company = data.company ? new Company(data.company) : null;
    this.salary_range = data.salary_range ?? '';
    this.job_type = data.job_type ? new JobType(data.job_type) : null;
    this.deadline = data.deadline ?? '';
    this.isFeatured = data.isFeatured ?? false;
  }
}

export class Application {
  id: string | null;
  job: Job | null;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  expected_salary: string;
  notice_period: string;
  status: string;
  constructor(data: any = {}) {
    this.id = data._id ?? null;
    this.job = data.job ? new Job(data.job) : null;
    this.name = data.name ?? '';
    this.email = data.email ?? '';
    this.resume_link = data.resume_link ?? '';
    this.cover_note = data.cover_note ?? '';
    this.expected_salary = data.expected_salary ?? '';
    this.notice_period = data.notice_period ?? '';
    this.status = data.status ?? 'pending';
  }
}
