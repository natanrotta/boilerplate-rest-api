export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get phone(): string {
    return this.props.phone;
  }

  get document(): string {
    return this.props.document;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      document: this.document,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}