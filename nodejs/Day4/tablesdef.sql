
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


CREATE TABLE [dbo].[Expenses](
	[ExpenseId] [int] IDENTITY(1,1) NOT NULL,
	[TransactionDetail] [nvarchar](max) NOT NULL,
	[TransactionDate] [Date] default getdate(),
	[Amount] NUMERIC(10,2) NULL,
	[CategoryId] [int] NOT NULL,
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO