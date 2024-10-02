USE [master]
GO

USE [Tabloid]
GO

DROP TABLE IF EXISTS [AvatarImage];
GO

CREATE TABLE [AvatarImage] (
	[Id] INTEGER PRIMARY KEY IDENTITY,
	[ImageLocation] nvarchar(255) NOT NULL,
	)

GO